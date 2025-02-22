import React from 'react';

interface AnchorProps {
    altName:string;
    path: string;
    classes: string;
}

const Image: React.FC<AnchorProps> = ({
    altName,
    path,
    classes
}) => {
    return(
        <>
            <img src={path} alt={altName} className={classes} />
        </>
    )
}

export default Image;