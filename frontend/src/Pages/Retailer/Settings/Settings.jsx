import Toolbar from 'Components/Toolbar'

const classes = {
  wrapper: "pr-4 md:pr-14 pl-4 ",
};

const Settings = () => {
  return (
    <div className={classes.wrapper}>
      <Toolbar title={'Settings'} actions={[]} />
      <div className={'flex flex-row'}>
        <div className={''}>Settings Card</div>
      </div>
    </div>
  )
}

export default Settings
