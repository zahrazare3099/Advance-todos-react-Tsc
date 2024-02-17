import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import { useMemo, useState } from "react";
import styles from "./NoteList.module.css";

type EditTagsModalProps = {
  availabelTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};
type SimplifiedNote = {
  title: string;
  tags: Tag[];
  id: string;
};
type NoteListProps = {
  availabelTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export default function NoteList({
  availabelTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProps) {
  //
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  // modal handle
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // handle filter note base on title and tag
  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((notTag) => notTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selectedTags]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={() => setIsOpen(true)}>
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
          <Col>
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <FormLabel>tags</FormLabel>
              <ReactSelect
                isMulti
                value={selectedTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags?.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  )
                }
                options={availabelTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Row sx={1} sm={2} lg={3} xl={4} className="g-3">
        {filterNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        show={isOpen}
        handleClose={() => setIsOpen(false)}
        availabelTags={availabelTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      key={id}
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <CardBody>
        <Stack
          gap={2}
          className="h-100 justify-items-center align-items-center"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

function EditTagsModal({
  availabelTags,
  show,
  handleClose,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Edit Tags</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Stack gap={2}>
            {availabelTags.map((tag: Tag) => {
              return (
                <Row key={tag.id}>
                  <Col>
                    <FormControl
                      type="text"
                      value={tag.label}
                      onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </Stack>
        </Form>
      </ModalBody>
    </Modal>
  );
}
