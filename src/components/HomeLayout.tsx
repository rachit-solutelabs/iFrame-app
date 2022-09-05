import { useState } from "react";
import { useFormik } from "formik";

const HomeLayout = function () {
  type formikValuesType = { url: string };
  const [loading, setLoading] = useState(false);
  const [srcUrl, setSrcUrl] = useState("");
  const [srcdoc, setSrcdoc] = useState("");

  //   const validate = (values: formikValuesType) => {
  //     const { url } = values;
  //     const errors: { url?: string } = {};
  //     if (!url) {
  //       errors.url = "Please enter a URL.";
  //     }
  //     return errors;
  //   };

  const onSubmit = async (values: formikValuesType) => {
    type Data = {
      isError: boolean;
      isHeaderSameorigin?: boolean;
      data: string;
    };
    setSrcdoc("");
    setSrcUrl("");
    setLoading(true);
    const { url } = values;
    try {
      const response = await fetch(`${location.origin}/api/hello?url=${url}`);
      const resJson: Data = await response.json();
      if (resJson?.isError) {
        throw new Error(resJson?.data);
      } else {
        if (resJson?.isHeaderSameorigin) {
          const srcString = resJson?.data;
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(srcString, "text/html");
          const aTags = htmlDoc.getElementsByTagName("a");
          for (let i = 0; i < aTags.length; i++) {
            aTags[i].href = "javascript:void(0)";
          }
          const serializer = new XMLSerializer();
          const targetString = serializer.serializeToString(htmlDoc);
          setSrcdoc(targetString);
        } else {
          setSrcUrl(url);
        }
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: { url: "" },
    // validate,
    onSubmit,
  });

  return (
    <>
      <section className="py-4 w-full flex flex-col gap-3 items-center text-2xl">
        <h2 className="">Render webpage as an iframe</h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mx-auto flex gap-4 justify-center">
            <input
              type={"url"}
              name="url"
              required
              placeholder="Enter a URL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.url}
              className={"w-[60%] p-1 py-2 text-sm"}
            />
            <button
              type="submit"
              disabled={loading}
              className={`text-lg ${
                loading
                  ? "bg-gray-300 cursor-default shadow-none px-7"
                  : "bg-blue-500 hover:bg-blue-600 px-2"
              } text-white shadow-lg hover:shadow-none transition-colors duration-300`}
            >
              {loading ? "Loading..." : "Render iFrame"}
            </button>
          </div>
          {/* {formik.touched.url && formik.errors.url && (
            <p className="text-red-500 text-center mt-2">{formik.errors.url}</p>
          )} */}
        </form>
      </section>
      <section className="flex justify-center">
        {srcdoc && (
          <iframe
            srcDoc={srcdoc}
            id="with-srcdoc"
            width="80%"
            className="h-[80vh]"
            sandbox="allow-same-origin allow-scripts"
          >
            <p>Your browser does not support iframes!</p>
          </iframe>
        )}
        {srcUrl && (
          <iframe src={srcUrl} id="with-src" width="80%" className="h-[80vh]">
            <p>Your browser does not support iframes!</p>
          </iframe>
        )}
      </section>
    </>
  );
};
export default HomeLayout;
