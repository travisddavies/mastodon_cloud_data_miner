// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'Scenario1',
    path: '/dashboard/s1',
    icon: icon('ic_chart'),
  },
  {
    title: 'Scenario2',
    path: '/dashboard/s2',
    icon: icon('ic_chart'),
  },
  {
    title: 'Scenario3',
    path: '/dashboard/s3',
    icon: icon('ic_chart'),
  },
  {
    title: 'Quiz',
    path: '/dashboard/quiz',
    icon: icon('ic_quiz'),
  },
];

export default navConfig;
