import { enabledTimes } from "constants/urls";
import { useMemo } from "react";
import { TimeState, useTimeStore } from "store/useTimeStore";
import {
  BottomDrawer,
  computeCalc,
  ListSelection,
  SegmentedSwitch,
  useDataFetch,
} from "ui";

const maxHeight = computeCalc("calc(100vh - 100px)");
interface IBodyProps {
  times: ITime[];
  timeType: ITime["type"];
}
function Body({ times, timeType }: IBodyProps) {
  const time = useTimeStore().time;
  const setTime = useTimeStore().actions.setTime;

  return (
    <div className="px-4 pb-4">
      <ListSelection
        options={times
          ?.filter((item) => item.type === timeType)
          .map((item) => ({
            id: item.value,
            name: item.value == "now" ? "Hozir" : item.value,
            details: item.type,
          }))}
        selectedKeys={[time.value]}
        onChange={(e) => setTime({ value: e?.id, type: e?.details })}
      />
    </div>
  );
}
function SelectTime() {
  const { modalOpen, timeType, actions } = useTimeStore();
  const { data } = useDataFetch<IBodyProps["times"]>({
    url: enabledTimes,
  });

  const segmentOptions = useMemo(() => {
    if (!data) return [];
    const options = [{ label: "Bugun", value: "today" }];
    if (data[data.length - 1].type === "tomorrow")
      options.push({ label: "Ertaga", value: "tomorrow" });
    return options;
  }, [data]);
  return (
    <BottomDrawer
      isOpen={modalOpen}
      onClose={() => actions.setModalOpen(false)}
      minHeight={maxHeight - 200}
      defaultHeight={maxHeight}
      maxHeight={maxHeight}
      zIndex={9999}
      title="Qulay vaqtni tanlang"
      header={
        <div className="flex justify-center pt-2">
          <SegmentedSwitch
            active={timeType}
            options={segmentOptions}
            onChange={(e) => actions.setTimeType(e as TimeState["timeType"])}
          />
        </div>
      }
    >
      {modalOpen && data && <Body times={data} timeType={timeType} />}
    </BottomDrawer>
  );
}

export default SelectTime;
