// import Section from "components/section/Section";
import { Star } from "lucide-react";
import { Section } from "ui";

function UserInfoHeader() {
  
  return (
    <Section className="flex items-center justify-between rounded-none">
      <div className="w-[34px] h-[34px] rounded-[50%] overflow-hidden">
        <img
          src={window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url || ""}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex align-center text-[18px]">
        <span className="mr-2 text-[var(--tg-theme-text-color)]">5600</span>
        <div className="w-[18]">
          <Star fill="yellow" stroke="yellow" />
        </div>
      </div>
    </Section>
  );
}

export default UserInfoHeader;
