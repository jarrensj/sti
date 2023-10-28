const NoteItem = ({ note, created_at }: NoteProps) => {
  return (
    <>
      <h1>{note}</h1>
      <p>Message was sent on: {created_at} </p>
    </>        
  );
};

export default NoteItem;

type NoteProps = {
  note: string;
  created_at: string;
};