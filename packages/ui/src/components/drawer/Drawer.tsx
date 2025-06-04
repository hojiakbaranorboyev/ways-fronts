import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./style.scss";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  children: React.ReactNode;
  header?: React.ReactNode;
  canHide?: boolean;
  zIndex?: number;
  showOverlay?: boolean;
  footer?: React.ReactNode;
  className?: string;
  title?: string;
}
const windowHeight = window.innerHeight - 120;
export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isOpen,
  defaultHeight = 300,
  minHeight = 0,
  maxHeight = 850,
  children,
  canHide = true,
  zIndex = 9,
  showOverlay = true,
  footer,
  className,
  title,
  header,
  onClose,
}) => {
  const [height, setHeight] = useState(defaultHeight);
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);
  const startHeightRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    if (isOpen) setHeight(defaultHeight);
  }, [isOpen, defaultHeight]);

  const handleTouchStart = (e: React.TouchEvent) => {
    // if (
    //   contentRef.current
    //   // contentRef.current.scrollHeight > contentRef.current.clientHeight
    // ) {
    //   return;
    // }
    e.stopPropagation();

    startYRef.current = e.touches[0].clientY;
    startHeightRef.current = height;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // if (contentRef.current) {
    //   return;
    // }

    e.stopPropagation();

    if (startYRef.current !== null && startHeightRef.current !== null) {
      const deltaY = startYRef.current - e.touches[0].clientY;
      let newHeight = startHeightRef.current + deltaY;
      console.log(Math.max(windowHeight, maxHeight), newHeight);

      if (maxHeight > newHeight) {
        newHeight = canHide
          ? newHeight
          : Math.max(minHeight, Math.min(newHeight, maxHeight));

        setHeight(newHeight);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // if (contentRef.current) {
    //   return;
    // }
    e.stopPropagation();
    if (startHeightRef.current !== null) {
      // console.log(contentRef.current?.scrollTop);
      if (canHide) {
        if (height < minHeight) onClose();
        else if (maxHeight - height < 200) setHeight(maxHeight);
        else if (minHeight - height < 200) setHeight(minHeight);
      } else {
        if (maxHeight - height < 200) setHeight(maxHeight);
        else if (minHeight - height < 200) setHeight(minHeight);
      }
    }
    startYRef.current = null;
    startHeightRef.current = null;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (height <= 0) onClose();
  }, [height]);

  // const scrollDownAllowed = useMemo(() => {
  //   return canHide === undefined || canHide;
  // }, [canHide]);

  const events = {
    onTouchStart:
      canHide === undefined || canHide ? handleTouchStart : undefined,
    onTouchMove: canHide === undefined || canHide ? handleTouchMove : undefined,
    onTouchEnd: canHide === undefined || canHide ? handleTouchEnd : undefined,
  };

  return createPortal(
    <div
      className={`${className || ""} bottom-drawer ${
        isOpen ? "open" : "closed"
      }`}
      style={{ zIndex: zIndex }}
    >
      {/* Overlay */}
      {showOverlay && <div className="overlay" onClick={handleOverlayClick} />}

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="drawer"
        style={{
          height: `${height}px`,
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="drag-handle z-50" {...events} />

        {/* Scrollable Content */}
        <div
          className="drawer-content"
          style={{ height: "100%" }}
          ref={contentRef}
        >
          {(title || header) && (
            <div
              className="drawer-header fixed top-0 left-0 right-0 p-4"
              ref={headerRef}
              {...events}
            >
              <div className="flex items-center justify-between text-[var(--tg-theme-text-color)]">
                <h6 className="text-[20px]">{title}</h6>
                <button className="text-[var(--tg-muted)]" onClick={onClose}>
                  <X />
                </button>
              </div>
              {header && header}
            </div>
          )}
          <div
            style={{
              paddingBottom: footer ? 100 : 0,
              paddingTop: headerRef.current?.clientHeight || 0,
            }}
          >
            {children}
          </div>
          {footer && <div className="drawer-footer">{footer}</div>}
        </div>
      </div>
    </div>,
    document.getElementById("drawer") as HTMLElement
  );
};
