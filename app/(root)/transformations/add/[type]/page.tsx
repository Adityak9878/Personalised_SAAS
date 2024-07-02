import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const AddTransformationTypePage = async ({
  params:{ type }
}:SearchParamProps) => {

  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in');

  const user = await getUserById(userId)

  return (
    <>
      <Header
      title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
    <section className='mt-10 ml-5 mr-5'>
    <TransformationForm 
         action="Add"
          userId={userId}
          type={transformation.type as TransformationTypeKey}
          creditBalance={100} 
    />
    </section>

    </>

    
  )
}

export default AddTransformationTypePage
