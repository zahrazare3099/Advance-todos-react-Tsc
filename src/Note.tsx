import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
};
export default function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const { title, id, markdown, tags } = note;
  const navigate = useNavigate();

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{title}</h1>
          {tags?.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags?.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(id);
                navigate("..");
              }}
            >
              Delete
            </Button>
            <Link to={"/"} replace>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Markdown className="border p-2 rounded">{markdown}</Markdown>
    </>
  );
}
