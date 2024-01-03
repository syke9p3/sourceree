const Badge = ({ status, children }) => {
  let badgeColorClass = '';

  switch (status) {
    case 'Active':
      badgeColorClass = 'bg-teal-500';
      break;
    case 'Warning':
      badgeColorClass = 'bg-yellow-500';
      break;
    case 'Inactive':
      badgeColorClass = 'bg-red-500';
      break;
    default:
      badgeColorClass = 'bg-grey-500';
  }

  return (
    <div className={`text-xs p-1 text-white font-semibold rounded-full ${badgeColorClass}`}>
      {children}
    </div>
  );
};

export default Badge;
