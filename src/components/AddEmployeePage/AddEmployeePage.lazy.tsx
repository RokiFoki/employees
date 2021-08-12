import React, { lazy, Suspense } from 'react';

const LazyAddEmployeePage = lazy(() => import('./AddEmployeePage'));

const AddEmployeePage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddEmployeePage {...props} />
  </Suspense>
);

export default AddEmployeePage;
