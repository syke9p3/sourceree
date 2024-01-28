const Badge = ({ status, children }) => {
  let badgeColorClass = '';

  switch (status) {
    case 'Passed':
      badgeColorClass = 'bg-teal-500';
      break;
    case 'Warning':
      badgeColorClass = 'bg-yellow-500';
      break;
    case 'Rejected':
      badgeColorClass = 'bg-red-500';
      break;
    case 'Pending':
      badgeColorClass = 'bg-gray-400';
      break;
    case 'Engaged':
      badgeColorClass = 'bg-green-500';
      break;
    case 'Expired':
      badgeColorClass = 'bg-red-500';
      break;
    default:
      badgeColorClass = 'bg-grey-500';
  }

  return (
    <div className={`text-xs px-2 py-1 text-white font-semibold rounded-md ${badgeColorClass}`}>
      {children}
    </div>
  );
};

export default Badge;
