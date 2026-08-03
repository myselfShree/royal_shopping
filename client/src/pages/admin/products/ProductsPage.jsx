import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { z } from 'zod'
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'
import AdminLayout from '../../../layouts/AdminLayout'
import api from '../../../services/api'

const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().optional(),
  sku: z.string().optional(),
  brand: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['DRAFT', 'ACTIVE']),
  price: z.coerce.number().min(0, 'Price must be 0 or more'),
  discountPrice: z.coerce.number().optional().nullable(),
  stock: z.coerce.number().min(0, 'Stock must be 0 or more'),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  newArrival: z.boolean().optional(),
  images: z.string().optional(),
  sizes: z.string().optional(),
  colors: z.string().optional(),
  tags: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
})

const columnHelper = createColumnHelper()

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [feedback, setFeedback] = useState({ message: '', type: 'success' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      slug: '',
      sku: '',
      brand: '',
      category: '',
      status: 'ACTIVE',
      price: 0,
      discountPrice: undefined,
      stock: 0,
      featured: false,
      bestSeller: false,
      newArrival: false,
      images: '',
      sizes: '',
      colors: '',
      tags: '',
      shortDescription: '',
      description: '',
    },
  })

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const params = {
        q: search || undefined,
        category: filterCategory || undefined,
        brand: filterBrand || undefined,
        status: filterStatus || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        page,
        limit: meta.limit,
      }
      const response = await api.get('/products', { params })
      setProducts(response.data.products || [])
      setMeta(response.data.meta || { total: 0, page: 1, limit: meta.limit, totalPages: 1 })
    } catch (err) {
      setFeedback({ message: 'Unable to load products. Please refresh.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {
    await fetchProducts(1)
  }

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > meta.totalPages) return
    await fetchProducts(newPage)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    reset({
      id: product.id,
      title: product.title,
      slug: product.slug,
      sku: product.sku || '',
      brand: product.brand || '',
      category: product.category?.name || product.category || '',
      status: product.status,
      price: product.price,
      discountPrice: product.discountPrice ?? undefined,
      stock: product.stock,
      featured: product.featured,
      bestSeller: product.bestSeller,
      newArrival: product.newArrival,
      images: (product.images || []).join(', '),
      sizes: (product.sizes || []).join(', '),
      colors: (product.colors || []).join(', '),
      tags: (product.tags || []).join(', '),
      shortDescription: product.shortDescription || '',
      description: product.description || '',
    })
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
    reset({
      title: '',
      slug: '',
      sku: '',
      brand: '',
      category: '',
      status: 'ACTIVE',
      price: 0,
      discountPrice: undefined,
      stock: 0,
      featured: false,
      bestSeller: false,
      newArrival: false,
      images: '',
      sizes: '',
      colors: '',
      tags: '',
      shortDescription: '',
      description: '',
    })
  }

  const onSubmit = async (values) => {
    const payload = {
      title: values.title,
      slug: values.slug || undefined,
      sku: values.sku || undefined,
      brand: values.brand || undefined,
      category: values.category || undefined,
      status: values.status,
      price: Number(values.price),
      discountPrice: values.discountPrice ?? undefined,
      stock: Number(values.stock),
      featured: Boolean(values.featured),
      bestSeller: Boolean(values.bestSeller),
      newArrival: Boolean(values.newArrival),
      images: values.images.split(',').map((item) => item.trim()).filter(Boolean),
      sizes: values.sizes.split(',').map((item) => item.trim()).filter(Boolean),
      colors: values.colors.split(',').map((item) => item.trim()).filter(Boolean),
      tags: values.tags.split(',').map((item) => item.trim()).filter(Boolean),
      shortDescription: values.shortDescription || undefined,
      description: values.description || undefined,
    }

    try {
      // check for file input
      const fileInput = document.getElementById('imagesFiles')
      const files = fileInput?.files && fileInput.files.length ? fileInput.files : null

      if (files) {
        const formData = new FormData()
        formData.append('title', payload.title)
        if (payload.slug) formData.append('slug', payload.slug)
        if (payload.sku) formData.append('sku', payload.sku)
        if (payload.brand) formData.append('brand', payload.brand)
        if (payload.category) formData.append('category', payload.category)
        formData.append('status', payload.status)
        formData.append('price', String(payload.price))
        if (payload.discountPrice !== undefined) formData.append('discountPrice', String(payload.discountPrice))
        formData.append('stock', String(payload.stock))
        formData.append('featured', payload.featured ? 'true' : 'false')
        formData.append('bestSeller', payload.bestSeller ? 'true' : 'false')
        formData.append('newArrival', payload.newArrival ? 'true' : 'false')
        formData.append('sizes', JSON.stringify(payload.sizes))
        formData.append('colors', JSON.stringify(payload.colors))
        formData.append('tags', JSON.stringify(payload.tags))
        if (payload.shortDescription) formData.append('shortDescription', payload.shortDescription)
        if (payload.description) formData.append('description', payload.description)
        for (const file of files) formData.append('images', file)

        if (editingProduct?.id) {
          await api.put(`/products/${editingProduct.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          setFeedback({ message: 'Product updated successfully', type: 'success' })
        } else {
          await api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          setFeedback({ message: 'Product created successfully', type: 'success' })
        }
      } else {
        if (editingProduct?.id) {
          await api.put(`/products/${editingProduct.id}`, payload)
          setFeedback({ message: 'Product updated successfully', type: 'success' })
        } else {
          await api.post('/products', payload)
          setFeedback({ message: 'Product created successfully', type: 'success' })
        }
      }
      handleCancelEdit()
      await fetchProducts(1)
    } catch (err) {
      setFeedback({ message: err.response?.data?.message || 'Unable to save product.', type: 'error' })
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      setFeedback({ message: 'Product removed', type: 'success' })
      await fetchProducts(meta.page)
    } catch (err) {
      setFeedback({ message: err.response?.data?.message || 'Unable to delete product.', type: 'error' })
    }
  }

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category?.name || product.category || '').filter(Boolean)))
  }, [products])

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.brand || '').filter(Boolean)))
  }, [products])

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Product',
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue()?.name || info.getValue() || '—',
      }),
      columnHelper.accessor('brand', {
        header: 'Brand',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: (info) => `₹${info.getValue()}`,
      }),
      columnHelper.accessor('stock', {
        header: 'Stock',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => (
          <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${
            info.getValue() === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-700'
          }`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleEdit(info.row.original)}
              className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 transition hover:border-brand-primary hover:text-brand-primary"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(info.row.original.id)}
              className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 transition hover:border-red-500 hover:text-red-600"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        ),
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products],
  )

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const totalInventory = useMemo(() => products.reduce((sum, item) => sum + Number(item.stock || 0), 0), [products])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-primary">Product management</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-950">Products</h1>
            <p className="mt-2 text-sm text-stone-600">Search, edit, and manage inventory for your storefront.</p>
          </div>
          <div className="rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary">Total stock: {totalInventory}</div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-stone-950">Product catalog</h2>
                <p className="mt-1 text-sm text-stone-600">Filter, sort, and update products as needed.</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleCancelEdit()}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-brand-primary hover:text-brand-primary"
                >
                  New product
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Search</label>
                <div className="flex items-center gap-2">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
                    placeholder="Search products…"
                    className="w-full rounded-[12px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-primary"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-full bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90"
                  >
                    <FiSearch size={16} />
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Category</label>
                <select
                  value={filterCategory}
                  onChange={(event) => setFilterCategory(event.target.value)}
                  className="w-full rounded-[12px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-primary"
                >
                  <option value="">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Brand</label>
                <select
                  value={filterBrand}
                  onChange={(event) => setFilterBrand(event.target.value)}
                  className="w-full rounded-[12px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-primary"
                >
                  <option value="">All brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Status</label>
                <select
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                  className="w-full rounded-[12px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-primary"
                >
                  <option value="">Any status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Min price</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(event) => setMinPrice(event.target.value)}
                  className="w-full rounded-[12px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Max price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className="w-full rounded-[12px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-brand-primary"
                />
              </div>
              <div className="col-span-2 flex items-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    setFilterCategory('')
                    setFilterBrand('')
                    setFilterStatus('')
                    setMinPrice('')
                    setMaxPrice('')
                    fetchProducts(1)
                  }}
                  className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 transition hover:border-brand-primary hover:text-brand-primary"
                >
                  Reset filters
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[20px] border border-stone-200">
              <table className="min-w-full divide-y divide-stone-200 text-sm">
                <thead className="bg-stone-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-4 py-3 text-left font-semibold text-stone-700">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-sm text-stone-500">
                        No products match the current filters.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="hover:bg-stone-50">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-4 py-4 align-top text-stone-700">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
              <p>
                Page {meta.page} of {meta.totalPages} · {meta.total} products
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(meta.page - 1)}
                  disabled={meta.page <= 1}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handlePageChange(meta.page + 1)}
                  disabled={meta.page >= meta.totalPages}
                  className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold transition hover:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-[24px] border border-stone-200 bg-white p-6 shadow-[0_10px_30px_-24px_rgba(17,17,17,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-stone-950">{editingProduct ? 'Edit product' : 'Add product'}</h2>
                <p className="mt-2 text-sm text-stone-600">Use the form to create or update product details.</p>
              </div>
              <div className="rounded-full bg-stone-100 p-3 text-stone-700">
                <FiPlus size={18} />
              </div>
            </div>

            {feedback.message ? (
              <div className={`rounded-xl px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}>
                {feedback.message}
              </div>
            ) : null}

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Title</label>
                <input {...register('title')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                {errors.title ? <p className="mt-1 text-xs text-red-600">{errors.title.message}</p> : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Slug</label>
                  <input {...register('slug')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                  {errors.slug ? <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">SKU</label>
                  <input {...register('sku')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Category</label>
                  <input {...register('category')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Brand</label>
                  <input {...register('brand')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Price</label>
                  <input type="number" step="0.01" {...register('price')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Discount price</label>
                  <input type="number" step="0.01" {...register('discountPrice')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Stock</label>
                  <input type="number" {...register('stock')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Status</label>
                  <select {...register('status')} className="w-full rounded-[12px] border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-primary">
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Sizes</label>
                  <input placeholder="S, M, L" {...register('sizes')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Colors</label>
                  <input placeholder="Black, Nude" {...register('colors')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Images</label>
                <input type="file" id="imagesFiles" name="images" accept="image/*" multiple className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
                <p className="mt-2 text-xs text-stone-500">Upload one or more images (max 5 MB each). Existing images will be replaced when uploading new files.</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Tags</label>
                <input placeholder="luxury, summer" {...register('tags')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Short description</label>
                <input {...register('shortDescription')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Description</label>
                <textarea rows={4} {...register('description')} className="w-full rounded-[12px] border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-primary" />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex items-center gap-3 rounded-[14px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
                  <input type="checkbox" {...register('featured')} />
                  Featured
                </label>
                <label className="flex items-center gap-3 rounded-[14px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
                  <input type="checkbox" {...register('bestSeller')} />
                  Best seller
                </label>
                <label className="flex items-center gap-3 rounded-[14px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700">
                  <input type="checkbox" {...register('newArrival')} />
                  New arrival
                </label>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {editingProduct ? 'Update product' : 'Create product'}
                </button>
                {editingProduct ? (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-brand-primary hover:text-brand-primary"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
