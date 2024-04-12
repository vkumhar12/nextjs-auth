// pages/AddMoreInputPage.tsx
"use client";
import React from "react";
import * as Yup from "yup";

interface Values {
  inputs: Array<{
    firstName: string;
    lastName: string;
  }>;
}

const initialValues: Values = {
  inputs: [{ firstName: "", lastName: "" }],
};

const validationSchema = Yup.object().shape({
  inputs: Yup.array().of(
    Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    })
  ),
});

const AddMoreInputPage: React.FC = () => {
  return (
    <div className="flex space-x-2  items-center">
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.8s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.01s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
      <span className="">Loading...</span>
    </div>
    // <div className="loading-spinner border-4 border-white rounded-xl"></div>
    // <div className="content">
    //   <h5 className="mt-3 mb-4 fw-bold">Add Mutliple items</h5>
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={validationSchema}
    //     onSubmit={(values, { setSubmitting }) => {
    //       console.log(values);
    //       setSubmitting(false);
    //     }}
    //   >
    //     {({ values }) => (
    //       <Form>
    //         <FieldArray name="inputs">
    //           {({ push, remove }) => (
    //             <>
    //               {values.inputs.map((_: any, index: number) => (
    //                 <div className="row mb-3" key={index}>
    //                   <div className="form-group col-md-4">
    //                     <label>First Name</label>
    //                     <Field
    //                       type="text"
    //                       name={`inputs[${index}].firstName`}
    //                       className="form-control"
    //                     />
    //                     <ErrorMessage
    //                       name={`inputs[${index}].firstName`}
    //                       component="div"
    //                       className="text-danger"
    //                     />
    //                   </div>
    //                   <div className="form-group col-md-4">
    //                     <label>Last Name</label>
    //                     <Field
    //                       type="text"
    //                       name={`inputs[${index}].lastName`}
    //                       className="form-control"
    //                     />
    //                     <ErrorMessage
    //                       name={`inputs[${index}].lastName`}
    //                       component="div"
    //                       className="text-danger"
    //                     />
    //                   </div>
    //                   <div className="form-group col-md-2 mt-4">
    //                     {values.inputs.length !== 1 && (
    //                       <button
    //                         type="button"
    //                         className="mx-1"
    //                         onClick={() => remove(index)}
    //                       >
    //                         Remove
    //                       </button>
    //                     )}
    //                     {values.inputs.length - 1 === index && (
    //                       <button
    //                         type="button"
    //                         onClick={() =>
    //                           push({ firstName: "", lastName: "" })
    //                         }
    //                       >
    //                         Add More
    //                       </button>
    //                     )}
    //                   </div>
    //                 </div>
    //               ))}
    //             </>
    //           )}
    //         </FieldArray>
    //         <button type="submit">Submit</button>
    //       </Form>
    //     )}
    //   </Formik>
    //   <Link href="/">Go back</Link>
    // </div>
  );
};

export default AddMoreInputPage;
