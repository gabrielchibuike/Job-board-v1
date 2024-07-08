import { SetStateAction, useEffect } from "react";
import Button from "../Reuseables/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles


function ThirdFormPage({
  handleClick,
  handleStepBackward,
  value,
  setValue,
}: {
  handleClick: () => void;
  handleStepBackward: () => void;
  handleInput: any;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  // const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard:{
      matchVisual : false,
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
  ];

  const handleChange = (content: SetStateAction<string>)=>{
    setValue(content)
  }

  useEffect(() => {
    console.log(value);
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center py-14 max-lg:h-auto max-lg:px-3">
        <div className="w-full max-w-[570px] rounded-xl max-lg:bg-transparent py-3 px-5 max-lg:px-0">
          <div className=" h-[500px]">
            <img src="describe.png" alt="" />
            <div className="mt-5">
              <div className="text-sm font-medium">Description</div>
              <ReactQuill
                value={value}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: "200px" }}
              />
            </div>
            <div className="w-full mt-24 flex justify-between gap-5">
              <Button
                btn_text="Back"
                additionalclass="w-[200px] bg-transparent border border-blue-700 max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg !text-blue-700"
                handleClick={handleStepBackward}
              />

              <Button
                btn_text="Continue"
                additionalclass="w-[200px]  max-lg:text-center text-lg  max-lg:py-3 py-3 rounded-lg"
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirdFormPage;
