import React from "react";

interface AnchorProps {
    name: string;
    href?: string;
    classes: string;
    onClick?: () => void;
}

const AnchorTag: React.FC<AnchorProps> = ({ name, href, classes, onClick }) => {
    return (
        <a href={href || "#"} className={classes} onClick={onClick}>
            {name}
        </a>
    );
};

export default AnchorTag;
