export const AttendanceRow = ({ student, status, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-sectionBg">
      <span className="font-medium text-primaryText">{student.name}</span>
      <div className="flex gap-2">
        <button
          onClick={() => onChange('present')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            status === 'present'
              ? 'bg-success text-white'
              : 'bg-sectionBg text-secondaryText hover:bg-gray-300'
          }`}
        >
          Present
        </button>
        <button
          onClick={() => onChange('absent')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            status === 'absent'
              ? 'bg-danger text-white'
              : 'bg-sectionBg text-secondaryText hover:bg-gray-300'
          }`}
        >
          Absent
        </button>
      </div>
    </div>
  )
}
