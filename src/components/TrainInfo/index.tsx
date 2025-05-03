/* eslint-disable */
/* eslint-disable prettier/prettier */
import * as React from "react";

export const TrainInfo = (): JSX.Element => {
    const [isHide, setIsHide] = React.useState(true);
    const onMouseOverHandler = () => setIsHide(false);
    const onMouseLeaveHandler = () => setIsHide(true);

    return (
        <div style={style.wrapper}>
            <span
                style={
                    isHide
                        ? { ...style.popupInfo, ...style.hide }
                        : style.popupInfo
                }
            >
                В стоимость входит минимальный тариф
            </span>
            <span
                style={style.letter}
                onMouseOver={onMouseOverHandler}
                onMouseLeave={onMouseLeaveHandler}
            >
                i
            </span>
        </div>
    );
};
const style = {
    wrapper: {
        display: "flex",
        position: "relative" as "relative",
        marginLeft: 5,
    },
    popupInfo: {
        position: "absolute" as "absolute",
        top: "-32",
        left: "-250",
        zIndex: 1,
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        width: 300,
        padding: 5,
        backgroundColor: "#454552",
        color: "#ffffff",
    },
    hide: {
        display: "none",
    },
    letter: {
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        width: 18,
        borderRadius: "50%",
        backgroundColor: "#ffa500",
        color: "#ffffff",
        fontWeight: 700,
        fontSize: "0.8rem",
    },
};
