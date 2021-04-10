import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


export default class CreateRoomPage extends Component {
    static defaultProps  = {
        voteToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: null,
        updateCallback: () => {},
    };

    constructor(props){
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            voteToSkip: this.props.voteToSkip,
            errormsg: "",
            successmsg: "",
        };
        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            voteToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value == 'true' ? true : false,
        });
    }

    renderCreateButtons() {
        return (<Grid container spacing={1}>
                <Grid item xs={12} align="center" onClick={this.handleRoomButtonPressed}>
                    <Button color = "primary" variant="contained">Create a Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color = "secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
                </Grid>);
    }

    renderUpdateButtons() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center" onClick={this.handleUpdateButtonPressed}>
                <Button color = "primary" variant="contained">Update Room</Button>
            </Grid>
            </Grid>);
    }

    handleRoomButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vote_to_skip: this.state.voteToSkip,
            guest_can_pause: this.state.guestCanPause,
          }),
        };
        fetch("/api/create-room", requestOptions)
          .then((response) => response.json())
          .then((data) => this.props.history.push("/room/" + data.code));
      }
      

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vote_to_skip: this.state.voteToSkip,
              guest_can_pause: this.state.guestCanPause,
              code: this.props.roomCode
            }),
          };
          fetch("/api/update-room", requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        successmsg: "Room Updated Succesfully!",
                    });
                } else {
                    this.setState({
                        errormsg: "Error while updating room :(",
                    });
                }
            this.props.updateCallback();
            });
    }



    render() {
        const title = this.props.update ? "Update Room" : "Create a Room";

        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Collapse in={ this.state.errormsg != "" || this.state.successmsg != "" }>
                    {this.state.successmsg != "" ? (<Alert severity="success" onClose={() => {
                        this.setState({
                            successmsg: "",
                        });
                    } }>{this.state.successmsg}</Alert>
                        ) : (
                        <Alert severity="error" onClose={() => {
                            this.setState({
                                errormsg: "",
                            });
                        } }>{this.state.errormsg}</Alert>)}
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component='h4' variant='h4'>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>

                    <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
                        <FormControlLabel value="true" control={<Radio color="primary"/>} label="Play/Pause" labelPlacement="bottom"/>
                        <FormControlLabel value="false" control={<Radio color="secondary"/>} label="No Control" labelPlacement="bottom"/>
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField
                        required={true}
                        type="number"
                        onChange={this.handleVotesChange}
                        defaultValue={this.props.voteToSkip}
                        inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                        }}
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {this.props.update ? this.renderUpdateButtons() : this.renderCreateButtons()}
        </Grid>);
    }
}