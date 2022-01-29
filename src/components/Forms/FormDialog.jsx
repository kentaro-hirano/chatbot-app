import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextInput from "./TextInput";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };

    this.inputName = this.inputName.bind(this);
    this.inputEmail = this.inputEmail.bind(this);
    this.inputDescription = this.inputDescription.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }

  inputName = (event) => {
    this.setState({ name: event.target.value });
  };

  inputEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  inputDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  submitForm = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

    const payload = {
      text:
        "お問い合わせがありました\n" +
        "お名前" +
        name +
        "\n" +
        "Email" +
        email +
        "\n" +
        "お問い合わせ内容\n" +
        description,
      // username: "botbot", ここでslackの名前変更
    };

    const url =
      "https://hooks.slack.com/services/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";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(() => {
      // alert("送信が完了しました。追ってご連絡いたします!");
      this.setState({
        name: "",
        email: "",
        description: "",
      });
      return this.props.handleClose();
    });
  };
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前(必須)"}
            multiline={false}
            rows={1}
            value={this.state.name}
            type={"text"}
            onChange={this.inputName}
          />
          <TextInput
            label={"メールアドレスレス(必須)"}
            multiline={false}
            rows={1}
            value={this.state.email}
            type={"text"}
            onChange={this.inputEmail}
          />
          <TextInput
            label={"お問い合わせ内容(必須)"}
            multiline={true}
            rows={5}
            value={this.state.description}
            type={"text"}
            onChange={this.inputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submitForm} color="primary" autoFocus>
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
