export const StatCard = ({ title, value, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-blue-600',
    accent: 'text-teal-600',
    warning: 'text-orange-600',
    success: 'text-green-600',
  }

  return (
    <div className="bg-cardBg rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondaryText text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-primaryText">{value}</p>
        </div>
        {Icon && <Icon className={`${colorClasses[color]} w-8 h-8 opacity-20`} />}
      </div>
    </div>
  )
}
