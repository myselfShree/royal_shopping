import { useEffect, useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'
import api from '../../../services/api'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [feedback, setFeedback] = useState({ message: '', type: '' })

  const [editingId, setEditingId] = useState(null)
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const res = await api.get('/categories')
      setCategories(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      setFeedback({ message: 'Failed to load categories', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (cat) => {
    setEditingId(cat.id)
    setName(cat.name)
    setImageUrl(cat.imageUrl || '')
  }

  const handleCancel = () => {
    setEditingId(null)
    setName('')
    setImageUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, { name: name.trim(), imageUrl: imageUrl.trim() || undefined })
        setFeedback({ message: 'Category updated successfully', type: 'success' })
      } else {
        await api.post('/categories', { name: name.trim(), imageUrl: imageUrl.trim() || undefined })
        setFeedback({ message: 'Category created successfully', type: 'success' })
      }
      handleCancel()
      loadCategories()
    } catch (err) {
      setFeedback({ message: err.response?.data?.message || 'Failed to save category', type: 'error' })
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try {
      await api.delete(`/categories/${id}`)
      setFeedback({ message: 'Category deleted', type: 'success' })
      loadCategories()
    } catch (err) {
      setFeedback({ message: 'Failed to delete category', type: 'error' })
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Management</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-950">Categories</h1>
          <p className="mt-2 text-sm text-stone-600">Add category names and images for the Homepage Myntra circle scroll bar.</p>
        </div>

        {feedback.message ? (
          <div className={`rounded-xl px-4 py-3 text-sm ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {feedback.message}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
          {/* Categories List */}
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-950 mb-4">All Categories ({categories.length})</h2>

            {loading ? (
              <p className="text-sm text-stone-500 py-8 text-center">Loading categories...</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between rounded-[16px] border border-stone-200 p-4 hover:border-brand-primary transition">
                    <div className="flex items-center gap-3">
                      <img src={cat.imageUrl} alt={cat.name} className="h-14 w-14 rounded-full object-cover border border-stone-200 bg-stone-100" />
                      <div>
                        <h3 className="font-semibold text-stone-900 text-sm">{cat.name}</h3>
                        <p className="text-xs text-stone-500">{cat.productCount || 0} Products</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(cat)} className="rounded-full border border-stone-200 p-2 text-stone-700 hover:border-brand-primary hover:text-brand-primary">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="rounded-full border border-stone-200 p-2 text-stone-700 hover:border-red-500 hover:text-red-600">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold text-stone-950 mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category Name (e.g. Kurti, Shoes)</label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kurti"
                  className="w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Circle Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-[12px] border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-brand-primary"
                />
                <p className="mt-1 text-[11px] text-stone-500">Provide an image URL to display inside the homepage circle pill.</p>
              </div>

              <div className="pt-2 flex gap-2">
                <button type="submit" className="w-full rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90">
                  {editingId ? 'Update' : 'Create Category'}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancel} className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-stone-900">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
