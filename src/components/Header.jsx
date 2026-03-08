import React, { memo } from "react";
import Indicators from "./Indicators";
import SoundSwitcher from "./SoundSwitcher";
import LevelMenu from "./LevelMenu";
import ErrorsAndCpmBlock from "./ErrorsAndCpmBlock";
import ColorSwitcher from "./ColorSWitcher";

const Header = memo(() => {
  return (
    <header className="flex flex-wrap justify-between md:justify-evenly items-start gap-2 mb-11 relative z-10">
      <div className="flex items-start gap-4">
        <Indicators />
        <div className="flex items-center gap-6 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
          <SoundSwitcher />
          <ColorSwitcher />
        </div>
      </div>
      <LevelMenu />
      <ErrorsAndCpmBlock />
    </header>
  );
});
export default Header;
