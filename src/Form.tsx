import { FormEvent, useRef, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availabelTags: Tag[];
} & Partial<NoteData>;

export default function Form({
  onSubmit,
  onAddTag,
  availabelTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  // declare initial state of inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  //create navigate
  const navigate = useNavigate();

  // handle on submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // `!` expression => force not to be null (require)
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };
  return (
    <FormGroup
      onSubmit={(e: FormEvent) => {
        handleSubmit(e);
      }}
    >
      <Stack gap={4}>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <FormLabel>Title</FormLabel>
              <FormControl required ref={titleRef} defaultValue={title} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="tags">
              <FormLabel>tags</FormLabel>
              <ReactSelectCreatable
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
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  //   update initial state
                  onAddTag(newTag);
                  //   updata list of options
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                options={availabelTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup controlId="markdowm">
          <FormLabel>descreption</FormLabel>
          <FormControl
            required
            as="textarea"
            rows={15}
            ref={markdownRef}
            defaultValue={markdown}
          />
        </FormGroup>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button
            type="submit"
            variant="primary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </FormGroup>
  );
}
