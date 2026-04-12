import { useState } from 'react'
import { X } from 'lucide-react'

export const StudentDrawer = ({ isOpen, onClose, onSubmit, batches = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    parentName: '',
    parentContact: '',
    batchId: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: '', class: '', parentName: '', parentContact: '', batchId: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full md:w-96 p-6 rounded-t-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primaryText">Add Student</h2>
          <button onClick={onClose} className="text-secondaryText hover:text-primaryText">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Parent Name</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Parent Contact</label>
            <input
              type="tel"
              name="parentContact"
              value={formData.parentContact}
              onChange={handleChange}
              className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primaryText mb-1">Batch</label>
            <select
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-sectionBg text-primaryText py-2 rounded-lg font-semibold hover:bg-sectionBg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
