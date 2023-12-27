import { useEffect, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'

const DragTypes = {
  TEXT: 'text',
}

function Dashboard() {
  const [data, setChildren] = useState<any[]>([])
  const [currentElem, setCurrentElem] = useState('')

  const components: { [key: string]: any } = {
    text: {
      type: 'text',
      elem: <p style={{ fontSize: '20px' }}>Enter text</p>,
    },
  }
  const properties: { [key: string]: any } = {
    text: {
      type: 'text',
      elem: <p style={{ fontSize: '20px' }}>You can edit text</p>,
    },
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragTypes.TEXT,
    item: { type: DragTypes.TEXT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItemType(),
    }),
  }))

  const getEqualComponent = (type: any) => {
    console.log(type)
    setChildren((data) => [...data, components[type]])
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragTypes.TEXT,
      drop: (item: any, monitor) => getEqualComponent(item.type),
      collect: (monitor) => ({
        item: monitor.getItemType(),
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  )

  return (
    <div>
      <div className='flex align-center justify-center'>
        <h1>React Native Flow</h1>
      </div>
      <div className='flex flex-column justify-between w-screen h-screen bg-red-300'>
        <div className='bg-white h-screen w-3/12 p-6'>
          <h2>Components</h2>
          <div className='border border-solid border-gray-300 p-6' ref={drag}>
            <p>Text</p>
          </div>
        </div>
        <div className='bg-slate-300 h-screen w-6/12 flex justify-center items-center'>
          <div className='bg-white h-4/5 w-6/12' ref={drop}>
            {data.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setCurrentElem(item.type)
                }}
              >
                {item.elem}
              </div>
            ))}
          </div>
        </div>
        <div className='bg-white h-screen w-3/12 p-6'>
          <h2>Properties</h2>
          {currentElem && properties[currentElem].elem}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
