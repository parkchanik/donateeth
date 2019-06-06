export default theme => ({
        root: {
          padding: theme.spacing.unit * 3
        },
        content: {
          alignItems: 'center',
          display: 'flex'
        },
        noticetest: {
          align: "center"
         
        },
        title: {
          color: theme.palette.text.secondary,
          fontWeight: 700
        },
        value: {
          marginTop: theme.spacing.unit
        },
      
        icon: {
          color: theme.palette.common.white,
          fontSize: '2rem',
          height: '2rem',
          width: '2rem'
        },
        footer: {
          marginTop: theme.spacing.unit * 2,
          display: 'flex',
          alignItems: 'center'
        },
     
        caption: {
          marginLeft: theme.spacing.unit
        }
      });
      