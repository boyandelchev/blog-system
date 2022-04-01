import './Notification.css';

const Notification = ({
    message,
}) => {
    return (
        <p className="notification">{message}</p>
    );
};

export default Notification;