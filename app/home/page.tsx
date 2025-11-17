
import React from 'react'
import AddRepoButton from './components/AddRepoButton'
import EmptyState from './components/EmptyState'
import AddNewButton from './components/AddNewButton'

  const page = () => {
  const playground:any[]=[]
  return (
    <div className='flex flex-col justify-start items-center min-h-screen  px-5 py-10 w-full'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
          <AddNewButton />
          <AddRepoButton/>
        </div>
      <div className='mt-10 flex flex-col justify-center items-center  w-full'>
          {playground&&playground.length===0?(<EmptyState title='No projects found' description='create a new playground to get started' imageSrc="/empty.svg"/>):(
            <p>
              Playground Table
            </p>
          )}
      </div>

    </div>
  )
}

export default page;