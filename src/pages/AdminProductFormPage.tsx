import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { AdminPanel } from '../components/AdminPanel'
import { AdminSidebar } from '../components/AdminSidebar'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '../elements'

type ProductStatus = 'Draft' | 'Published' | 'Archived'

type ProductFormValues = {
  name: string
  slug: string
  brand: string
  category: string
  shortDescription: string
  description: string
  price: string
  oldPrice: string
  sku: string
  stock: string
  lowStockThreshold: string
  status: ProductStatus
  featured: boolean
  bestSeller: boolean
  newArrival: boolean
}

type ProductRecord = {
  id: string
  values: ProductFormValues
  imageUrls: string[]
  specifications: { name: string; value: string }[]
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'number' | 'url'
  required?: boolean
  min?: string
  maxLength?: number
  error?: string
  help?: string
  step?: string
  pattern?: string
}

type FormErrors = Partial<Record<'name' | 'slug' | 'category' | 'description' | 'price' | 'oldPrice' | 'sku' | 'stock', string>>

const emptyValues: ProductFormValues = {
  name: '',
  slug: '',
  brand: '',
  category: '',
  shortDescription: '',
  description: '',
  price: '',
  oldPrice: '',
  sku: '',
  stock: '',
  lowStockThreshold: '5',
  status: 'Draft',
  featured: false,
  bestSeller: false,
  newArrival: false,
}

const productRecords: Record<string, ProductRecord> = {
  '1': {
    id: '1',
    values: {
      ...emptyValues,
      name: 'Sony WH-1000XM5',
      slug: 'sony-wh1000xm5-headphones',
      brand: 'Sony',
      category: 'Audio',
      description: 'Industry-leading noise cancellation meets all-day comfort.',
      price: '349',
      oldPrice: '399',
      sku: 'AUD-1001',
      stock: '2',
      status: 'Published',
    },
    imageUrls: ['https://example.com/xm5-1.jpg'],
    specifications: [
      { name: 'Battery life', value: '30 hours' },
      { name: 'Weight', value: '250g' },
      { name: 'Bluetooth', value: '5.2' },
    ],
  },
  '2': {
    id: '2',
    values: {
      ...emptyValues,
      name: 'Keychron K2 Keyboard',
      slug: 'keychron-k2-keyboard',
      brand: 'Keychron',
      category: 'Keyboards',
      description: 'Compact wireless mechanical keyboard with hot-swappable keys.',
      price: '129',
      sku: 'KEY-2040',
      stock: '3',
      status: 'Published',
    },
    imageUrls: ['https://example.com/k2.jpg'],
    specifications: [{ name: 'Layout', value: '75%' }],
  },
  '3': {
    id: '3',
    values: {
      ...emptyValues,
      name: 'Logitech MX Master 3S',
      slug: 'logitech-mx-master-3s',
      brand: 'Logitech',
      category: 'Desk setup',
      description: 'Ergonomic wireless mouse with a quiet scroll wheel.',
      price: '76',
      oldPrice: '89',
      sku: 'DSK-3012',
      stock: '48',
      status: 'Published',
    },
    imageUrls: ['https://example.com/mx3s.jpg'],
    specifications: [],
  },
}

const categories = [
  'Audio',
  'Keyboards',
  'Smart watches',
  'Desk setup',
  'Bags',
  'Phone accessories',
]

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  min,
  maxLength,
  error,
  help,
  step,
  pattern,
}: FieldProps) {
  const invalid = Boolean(error)

  return (
    <div className='flex min-w-0 flex-col gap-1.5'>
      <label htmlFor={id} className='text-[13px] font-bold'>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        maxLength={maxLength}
        step={step}
        pattern={pattern}
        aria-invalid={invalid}
        aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
        className={`w-full rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus:outline-2 focus:outline-offset-1 focus:outline-primary ${invalid ? 'border-danger' : 'border-border'}`}
      />
      {error ? <span id={`${id}-error`} className='text-xs text-danger'>{error}</span> : null}
      {help ? <span id={`${id}-help`} className='text-xs text-text-muted'>{help}</span> : null}
    </div>
  )
}

export function AdminProductFormPage() {
  const { id } = useParams()
  const record = id ? productRecords[id] : undefined

  return <AdminProductForm key={id ?? 'new'} id={id} record={record} />
}

function AdminProductForm({ id, record }: { id?: string; record?: ProductRecord }) {
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [values, setValues] = useState<ProductFormValues>(record?.values ?? emptyValues)
  const [imageUrls, setImageUrls] = useState<string[]>(record?.imageUrls ?? [''])
  const [specifications, setSpecifications] = useState(record?.specifications ?? [])
  const [slugTouched, setSlugTouched] = useState(Boolean(record))
  const [errors, setErrors] = useState<FormErrors>({})
  const [imageError, setImageError] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const title = record?.values.name ?? (isEditing ? 'Edit product' : 'New product')
    document.title = `${isEditing && record ? `Edit ${title}` : title} — Admin — LumaStore`
  }, [isEditing, record])

  useEffect(() => {
    if (!toast) return
    const timeoutId = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const updateValue = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
  }

  const updateName = (name: string) => {
    updateValue('name', name)
    if (!slugTouched) {
      updateValue('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
    }
  }

  const discountPercent = Number(values.oldPrice) > Number(values.price) && Number(values.price) > 0
    ? `${Math.round((1 - Number(values.price) / Number(values.oldPrice)) * 100)}% discount shown on the store`
    : ''

  const validate = () => {
    const nextErrors: FormErrors = {}
    const price = Number(values.price)
    const oldPrice = Number(values.oldPrice)
    const stock = Number(values.stock)

    if (values.name.trim().length < 3 || values.name.trim().length > 100) {
      nextErrors.name = 'Enter a name of 3 to 100 characters.'
    }
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(values.slug)) {
      nextErrors.slug = 'Use lowercase letters, numbers and hyphens.'
    }
    if (!values.category) nextErrors.category = 'Choose a category.'
    if (values.description.trim().length < 10 || values.description.length > 2000) {
      nextErrors.description = 'Write at least 10 characters.'
    }
    if (!Number.isFinite(price) || price <= 0) nextErrors.price = 'Price must be greater than 0.'
    if (values.oldPrice && (!Number.isFinite(oldPrice) || oldPrice <= price)) {
      nextErrors.oldPrice = 'Old price must be higher than the price.'
    }
    if (!values.sku.trim()) nextErrors.sku = 'SKU is required.'
    if (!values.stock || !Number.isInteger(stock) || stock < 0) {
      nextErrors.stock = 'Stock must be 0 or more.'
    }

    const nonemptyImageUrls = imageUrls.map((url) => url.trim()).filter(Boolean)
    const hasValidImages = nonemptyImageUrls.length > 0
      && nonemptyImageUrls.every((url) => /^https?:\/\/\S+$/.test(url))

    setErrors(nextErrors)
    setImageError(!hasValidImages)
    return Object.keys(nextErrors).length === 0 && hasValidImages
  }

  const save = (status: ProductStatus) => {
    updateValue('status', status)
    if (!validate()) {
      setToast('Fix the highlighted fields')
      return
    }
    setToast(status === 'Published' ? 'Published' : 'Saved as draft')
  }

  const updateImage = (index: number, url: string) => {
    setImageUrls((current) => current.map((image, imageIndex) => imageIndex === index ? url : image))
  }

  const removeImage = (index: number) => {
    if (imageUrls.length === 1) {
      setImageUrls([''])
      return
    }
    setImageUrls((current) => current.filter((_, imageIndex) => imageIndex !== index))
  }

  const updateSpecification = (index: number, key: 'name' | 'value', value: string) => {
    setSpecifications((current) => current.map((specification, specIndex) => (
      specIndex === index ? { ...specification, [key]: value } : specification
    )))
  }

  return (
    <div className='grid min-h-screen min-[861px]:grid-cols-[232px_1fr]'>
      <AdminSidebar
        activeSection='products'
        onSectionChange={(section) => navigate(`/admin#${section}`)}
      />

      <main className='min-w-0 px-8 pb-16 pt-7 max-[860px]:px-6'>
        <div className='mb-3.5 text-[13px] text-text-muted'>
          <Link to='/admin' className='hover:text-primary'>Admin</Link>
          {' / '}
          <Link to='/admin#products' className='hover:text-primary'>Products</Link>
          {' / '}
          <span>{record?.values.name ?? 'New product'}</span>
        </div>

        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <h1 className='text-[28px] font-extrabold tracking-[-0.02em]'>{isEditing ? 'Edit product' : 'New product'}</h1>
          <ThemeToggle />
        </div>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            save('Published')
          }}
        >
          <div className='grid items-start gap-5 min-[1001px]:grid-cols-[minmax(0,1fr)_300px]'>
            <div>
              <AdminPanel title='Basic information'>
                <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                  <div className='col-span-2 max-[860px]:col-span-1'>
                    <Field
                      id='name'
                      label='Product name'
                      value={values.name}
                      onChange={updateName}
                      required
                      maxLength={100}
                      placeholder='Sony WH-1000XM5 Headphones'
                      error={errors.name}
                    />
                  </div>
                  <Field
                    id='slug'
                    label='Slug'
                    value={values.slug}
                    onChange={(slug) => {
                      updateValue('slug', slug)
                      setSlugTouched(true)
                    }}
                    required
                    pattern='[a-z0-9]+(-[a-z0-9]+)*'
                    placeholder='sony-wh1000xm5-headphones'
                    error={errors.slug}
                  />
                  <Field
                    id='brand'
                    label='Brand'
                    value={values.brand}
                    onChange={(brand) => updateValue('brand', brand)}
                    placeholder='Sony'
                  />
                  <div className='flex min-w-0 flex-col gap-1.5'>
                    <label htmlFor='category' className='text-[13px] font-bold'>Category</label>
                    <select
                      id='category'
                      value={values.category}
                      onChange={(event) => updateValue('category', event.target.value)}
                      aria-invalid={Boolean(errors.category)}
                      className={`w-full rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text ${errors.category ? 'border-danger' : 'border-border'}`}
                    >
                      <option value=''>Select a category</option>
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                    {errors.category ? <span className='text-xs text-danger'>{errors.category}</span> : null}
                  </div>
                  <Field
                    id='short-description'
                    label='Short description'
                    value={values.shortDescription}
                    onChange={(shortDescription) => updateValue('shortDescription', shortDescription)}
                    maxLength={140}
                    placeholder='One line shown on product cards'
                  />
                  <div className='col-span-2 flex min-w-0 flex-col gap-1.5 max-[860px]:col-span-1'>
                    <label htmlFor='description' className='text-[13px] font-bold'>Full description</label>
                    <textarea
                      id='description'
                      value={values.description}
                      onChange={(event) => updateValue('description', event.target.value)}
                      required
                      minLength={10}
                      maxLength={2000}
                      aria-invalid={Boolean(errors.description)}
                      className={`min-h-27.5 w-full resize-y rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text focus:outline-2 focus:outline-offset-1 focus:outline-primary ${errors.description ? 'border-danger' : 'border-border'}`}
                    />
                    {errors.description ? <span className='text-xs text-danger'>{errors.description}</span> : null}
                  </div>
                </div>
              </AdminPanel>

              <AdminPanel title='Pricing and inventory'>
                <div className='grid grid-cols-2 gap-4 max-[860px]:grid-cols-1'>
                  <Field
                    id='price'
                    label='Price ($)'
                    type='number'
                    step='0.01'
                    value={values.price}
                    onChange={(price) => updateValue('price', price)}
                    required
                    placeholder='349'
                    error={errors.price}
                  />
                  <Field
                    id='old-price'
                    label='Old price ($)'
                    type='number'
                    step='0.01'
                    value={values.oldPrice}
                    onChange={(oldPrice) => updateValue('oldPrice', oldPrice)}
                    placeholder='399'
                    error={errors.oldPrice}
                    help={discountPercent}
                  />
                  <Field
                    id='sku'
                    label='SKU'
                    value={values.sku}
                    onChange={(sku) => updateValue('sku', sku)}
                    required
                    placeholder='AUD-1001'
                    error={errors.sku}
                  />
                  <Field
                    id='stock'
                    label='Stock quantity'
                    type='number'
                    step='1'
                    value={values.stock}
                    onChange={(stock) => updateValue('stock', stock)}
                    required
                    placeholder='14'
                    error={errors.stock}
                  />
                  <Field
                    id='low-stock'
                    label='Low stock threshold'
                    type='number'
                    step='1'
                    min='0'
                    value={values.lowStockThreshold}
                    onChange={(threshold) => updateValue('lowStockThreshold', threshold)}
                    help='Shows on the dashboard at or below this number.'
                  />
                </div>
              </AdminPanel>

              <AdminPanel title='Images'>
                <div className='flex flex-col gap-2.5'>
                  {imageUrls.map((url, index) => (
                    <div key={index} className='flex items-start gap-2.5'>
                      <input
                        type='url'
                        aria-label='Image URL'
                        value={url}
                        onChange={(event) => updateImage(index, event.target.value)}
                        placeholder='https://…'
                        className={`min-w-0 flex-1 rounded-[9px] border bg-surface px-3 py-2.5 text-sm text-text ${imageError && url ? 'border-danger' : 'border-border'}`}
                      />
                      <button
                        type='button'
                        aria-label='Remove image'
                        onClick={() => removeImage(index)}
                        className='h-10 w-10 shrink-0 cursor-pointer rounded-[9px] border border-border bg-transparent text-base text-text-muted hover:border-danger hover:text-danger'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                {imageError ? <p className='mt-2 text-xs text-danger'>Add at least one valid image URL (https://…).</p> : null}
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='mt-3'
                  onClick={() => setImageUrls((current) => [...current, ''])}
                >
                  + Add image URL
                </Button>
                <p className='mt-2 text-xs text-text-muted'>The first image is the main one.</p>
              </AdminPanel>

              <AdminPanel title='Specifications'>
                <div className='flex flex-col gap-2.5'>
                  {specifications.map((specification, index) => (
                    <div key={index} className='flex items-start gap-2.5'>
                      <div className='grid min-w-0 flex-1 grid-cols-2 gap-4 max-[600px]:grid-cols-1'>
                        <input
                          aria-label='Specification name'
                          value={specification.name}
                          onChange={(event) => updateSpecification(index, 'name', event.target.value)}
                          placeholder='Battery life'
                          className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm text-text'
                        />
                        <input
                          aria-label='Specification value'
                          value={specification.value}
                          onChange={(event) => updateSpecification(index, 'value', event.target.value)}
                          placeholder='30 hours'
                          className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm text-text'
                        />
                      </div>
                      <button
                        type='button'
                        aria-label='Remove specification'
                        onClick={() => setSpecifications((current) => current.filter((_, specIndex) => specIndex !== index))}
                        className='h-10 w-10 shrink-0 cursor-pointer rounded-[9px] border border-border bg-transparent text-base text-text-muted hover:border-danger hover:text-danger'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='mt-3'
                  onClick={() => setSpecifications((current) => [...current, { name: '', value: '' }])}
                >
                  + Add specification
                </Button>
              </AdminPanel>
            </div>

            <aside className='min-[1001px]:sticky min-[1001px]:top-5'>
              <AdminPanel title='Publish settings'>
                <div className='flex flex-col gap-1.5'>
                  <label htmlFor='status' className='text-[13px] font-bold'>Status</label>
                  <select
                    id='status'
                    value={values.status}
                    onChange={(event) => updateValue('status', event.target.value as ProductStatus)}
                    className='w-full rounded-[9px] border border-border bg-surface px-3 py-2.5 text-sm text-text'
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>

                <div className='mt-4 flex flex-col gap-2.5'>
                  {([
                    ['featured', 'Featured product', 'featured'],
                    ['best-seller', 'Best seller', 'bestSeller'],
                    ['new-arrival', 'New arrival', 'newArrival'],
                  ] as const).map(([id, label, key]) => (
                    <label key={id} className='flex cursor-pointer items-center gap-2.5 text-sm'>
                      <input
                        id={id}
                        type='checkbox'
                        checked={values[key]}
                        onChange={(event) => updateValue(key, event.target.checked)}
                        className='h-4 w-4 accent-primary'
                      />
                      {label}
                    </label>
                  ))}
                </div>

                <div className='mt-4.5 flex flex-col gap-2.5'>
                  <Button type='submit' className='w-full'>
                    {isEditing ? 'Save changes' : 'Publish product'}
                  </Button>
                  <Button type='button' variant='ghost' onClick={() => save('Draft')} className='w-full'>
                    Save as draft
                  </Button>
                  <Link
                    to='/admin#products'
                    className='inline-flex w-full items-center justify-center rounded-[9px] border border-border px-3.5 py-2 text-[13px] font-bold text-text hover:bg-surface-2'
                  >
                    Cancel
                  </Link>
                </div>
              </AdminPanel>
            </aside>
          </div>
        </form>
      </main>

      {toast ? (
        <div
          role='status'
          aria-live='polite'
          className='fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-text px-4.5 py-2.75 text-[13px] font-bold text-bg'
        >
          {toast}
        </div>
      ) : null}
    </div>
  )
}
