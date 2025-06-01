function ScoreSquere({ title, description = "8.6" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-accent-color-900 bg-card-background p-4">
      <p className="text-lg font-bold">{title}</p>
      <p className="text-3xl font-bold text-accent-color-900">{description}</p>
    </div>
  );
}

export default ScoreSquere;
