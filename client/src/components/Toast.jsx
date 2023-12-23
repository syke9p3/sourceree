import { useState } from 'react';

const Toast = ({ message, type }) => {
    const [showMessage, setShowMessage] = useState(true);

    const handleClose = () => {
        setShowMessage(false);
    };

    const getMessageStyle = () => {
        let style = 'bg-green-200 text-green-800';

        switch (type) {
            case 'error':
                style = 'bg-red-200 text-red-800';
                break;
            case 'warning':
                style = 'bg-yellow-200 text-yellow-800';
                break;
            // Add more cases as needed
            default:
                break;
        }

        return style + ' p-2 m-2 flex justify-between';
    };

    return (
        <>
            {showMessage && (
                <div className={getMessageStyle()}>
                    <span>{message}</span>
                    <button onClick={handleClose}>X</button>
                </div>
            )}
        </>
    );
};

export default Toast;
