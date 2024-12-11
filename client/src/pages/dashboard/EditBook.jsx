import { useEffect } from "react";
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
  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData?.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
    }
  }, [bookData, setValue]);

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
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
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
  if (isError) return <div>Error fetching book data</div>;
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

        <InputField
          label="URL da imagem de capa"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

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
