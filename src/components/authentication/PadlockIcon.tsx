import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.background.default,
  },
  lockIcon: {
    color: theme.palette.text.primary,
  }
}));
const PadlockIcon = () => {
  const classes = useStyles();

  return (
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon className={classes.lockIcon} />
    </Avatar>
  );
};

export default PadlockIcon;
