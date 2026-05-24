import advisorImg from '../../../assets/teams/ADVISOR.webp';
import faculty1Img from '../../../assets/teams/faculty-exec-1.webp';
import faculty2Img from '../../../assets/teams/faculty-exec-2.jpeg';
import faculty3Img from '../../../assets/teams/faculty-exec-3.webp';

export const teamData = {
  advisors: [
    {
      id: 'advisor-1',
      name: 'DR. SATYAJIT CHAKRABARTI',
      role: 'Vice Chancellor, IEM Kolkata',
      image: advisorImg
    }
  ],
  facultyExecutives: [
    {
      id: 'faculty-1',
      name: 'DR. SUBHABRATA BANERJEE',
      role: 'Assistant HOD, IEDC Coordinator, IEM Saltlake, Kolkata',
      phone1: '+91 8017764037',
      phone2: '+91 9433569949',
      image: faculty2Img
    },
    {
      id: 'faculty-2',
      name: 'DR. SANGHAMITRA PODDAR',
      role: 'Dean, Student Affairs & Alumni Relations Coordinator IQAC Cell, IEM Saltlake, Kolkata',
      image: faculty3Img
    },
    {
      id: 'faculty-3',
      name: 'DR. MALAY GANGOPADHYAY',
      role: 'Vice Principal, IEM Saltlake, Kolkata',
      image: faculty1Img
    }
  ]
};
