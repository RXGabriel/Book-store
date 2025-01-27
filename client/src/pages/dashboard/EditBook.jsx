import { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../redux/api/booksApi.js";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const EditBook = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("author", bookData.author);
      setValue("description", bookData.description);
      setValue("category", bookData?.category);
      setValue("trending", bookData.trending);
      setValue("pages", bookData.pages);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
      setImageFileName(bookData.coverImage);
    }
  }, [bookData, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Unauthorized",
        text: "You are not logged in. Please log in to continue.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const updateBookData = {
      title: data.title,
      author: data.author,
      description: data.description,
      category: data.category,
      trending: data.trending,
      pages: Number(data.pages),
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: imageFileName || bookData.coverImage,
    };

    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: "Livro atualizado",
        text: "Seu livro foi atualizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      await refetch();
    } catch (error) {
      const errorMessage = error.response
        ? `Error ${error.response.status}: ${
            error.response.data.message || "Unknown error"
          }`
        : "Network error or server not reachable.";

      Swal.fire({
        title: "Error",
        text: `Failed to update book.\n\n${errorMessage}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error ao buscar informações do livro</div>;
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Autor"
          name="author"
          placeholder="Insira o nome do autor"
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
            { value: "horror", label: "Horror" },
            { value: "infantil", label: "Infantil" },
            { value: "romance", label: "Romance" },
            { value: "aventura", label: "Aventura" },
            { value: "tecnologia", label: "Tecnologia" },
            { value: "negócios", label: "Negócios" },
            { value: "mistério", label: "Mistério" },
            { value: "fantasia", label: "Fantasia" },
            { value: "drama", label: "Drama" },
            { value: "ficção", label: "Ficção" },
            { value: "filosofia", label: "Filosofia" },
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
          label="Número de Páginas"
          name="pages"
          type="number"
          placeholder="Número de páginas"
          register={register}
        />

        <InputField
          label="Antigo Preço"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="Novo Preço"
          name="newPrice"
          type="number"
          placeholder="New Price"
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
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Atualizar livro
        </button>
      </form>
    </div>
  );
};

export default EditBook;