import React from "react";

const Countdown = React.memo(({ number, unit }) => {
    return (
        <div className="border px-[10px] py-[5px] w-[80px] h-[64px] text-center">
            <span className="text-[18px] font-bold">{number}</span>
            <p className="text-[13px]">{unit}</p>
        </div>
    );
});

export default Countdown;
