import { useState } from "react";
import { useAddBookMutation } from "../../redux/api/booksApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Loading from "../../components/Loading";

const AddBook = () => {
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Livro adicionado",
        text: "Seu livro foi adicionado com sucesso!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
      setImageFileName("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  return (
    <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <InputField
          label="Titulo"
          name="title"
          placeholder="Insira o título do livro"
          register={register}
        />

        <InputField
          label="Descrição"
          name="description"
          placeholder="Insira a descrição do livro"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Categoria"
          name="category"
          options={[
            { value: "", label: "Escolha uma categoria" },
            { value: "business", label: "Business" },
            { value: "technology", label: "Technology" },
            { value: "fiction", label: "Fiction" },
            { value: "horror", label: "Horror" },
            { value: "adventure", label: "Adventure" },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Popular
            </span>
          </label>
        </div>

        <InputField
          label="Preço antigo"
          name="oldPrice"
          type="number"
          placeholder="Preço antigo"
          register={register}
        />

        <InputField
          label="Novo Preço"
          name="newPrice"
          type="number"
          placeholder="Novo Preço"
          register={register}
        />

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagem do livro
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-2 w-full"
          />
          {imageFileName && (
            <p className="text-sm text-gray-500">Selected: {imageFileName}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded-md"
        >
          {isLoading ? <Loading /> : <span>Adicionar Livro</span>}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
