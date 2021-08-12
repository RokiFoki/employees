import React, { lazy, Suspense } from 'react';

const LazyAddEmployeeForm = lazy(() => import('./AddEmployeeForm'));

const AddEmployeeForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddEmployeeForm {...props} />
  </Suspense>
);

export default AddEmployeeForm;
