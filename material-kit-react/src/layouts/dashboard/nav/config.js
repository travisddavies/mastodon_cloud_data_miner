// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_blog'),
  },
  {
    title: 's1',
    path: '/dashboard/user',
    icon: icon('ic_analytics'),
  },
  {
    title: 's2',
    path: '/dashboard/s2',
    icon: icon('ic_analytics'),
  },

  {
    title: 's3',
    path: '/dashboard/s3',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
