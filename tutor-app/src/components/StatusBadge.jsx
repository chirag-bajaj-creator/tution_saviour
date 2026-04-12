export const StatusBadge = ({ status }) => {
  const statusConfig = {
    paid: { bg: 'bg-green-50', text: 'text-success', label: 'Paid' },
    unpaid: { bg: 'bg-red-50', text: 'text-danger', label: 'Unpaid' },
    partial: { bg: 'bg-orange-50', text: 'text-warning', label: 'Partial' },
  }

  const config = statusConfig[status] || statusConfig.unpaid

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg}`}>
      <span className={config.text}>{config.label}</span>
    </div>
  )
}
