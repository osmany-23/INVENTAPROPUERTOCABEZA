import React from "react";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";

const Credits = () => {
    return (
        <div className="card">
            <TabTitle title={placeholderText("credits.title")} />
            <div className="card-body py-6 text-center">
                <h3 className="mb-0">{getFormattedMessage("credits.title")}</h3>
            </div>
        </div>
    );
};

export default Credits;
