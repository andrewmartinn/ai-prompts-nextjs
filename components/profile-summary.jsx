import PromptCard from "./prompt-card";

export default function ProfileSummary({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full">
      <h1 className="blue_gradient text-left text-4xl font-extrabold">
        {name} Profile
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleEdit && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}
