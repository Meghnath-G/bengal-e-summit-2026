import advisorImg from '../../../assets/teams/ADVISOR.webp';
import faculty1Img from '../../../assets/teams/faculty-exec-1.webp';
import faculty2Img from '../../../assets/teams/faculty-exec-2.jpeg';
import faculty3Img from '../../../assets/teams/faculty-exec-3.webp';

// Event Leads imports
import utkarshImg from '../../../assets/teams/utkarsh.webp';
import sulagnaImg from '../../../assets/teams/sulagna.webp';
import swastikaImg from '../../../assets/teams/swastika.webp';

// Website Developers imports
import meghnathImg from '../../../assets/teams/meghnath-1.jpeg';
import dishaImg from '../../../assets/teams/disha.jpeg';
import chintanImg from '../../../assets/teams/chintan.jpg';
import jitankaImg from '../../../assets/teams/jitanka.jpeg';
import jishnuImg from '../../../assets/teams/jishnu.jpeg';

export const teamData = {
  advisors: [
    {
      id: 'advisor-1',
      name: 'DR. SATYAJIT CHAKRABARTI',
      role: 'Vice Chancellor, UEM, Kolkata\nDirector, IEM, Kolkata',
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
  ],
  eventLeads: [
    {
      id: 'event-lead-1',
      name: 'Utkarsh Srivastava',
      phone1: '+91-79801 44505',
      image: utkarshImg
    },
    {
      id: 'event-lead-2',
      name: 'Sulagna Roy',
      phone1: '+91-74397 11702',
      image: sulagnaImg
    },
    {
      id: 'event-lead-3',
      name: 'Swastika Talukdar',
      phone1: '+91-89610 05299',
      image: swastikaImg
    }
  ],
  websiteDevelopers: [
    {
      id: 'web-dev-1',
      name: 'Meghnath Gorai',
      role: 'Web & Technical Head',
      phone1: '+91-81672 43225',
      image: meghnathImg
    },
    {
      id: 'web-dev-2',
      name: 'Disha Nanda',
      role: 'Website Developer',
      image: dishaImg
    },
    {
      id: 'web-dev-3',
      name: 'Chintan Mallick',
      role: 'Website Developer',
      image: chintanImg
    },
    {
      id: 'web-dev-4',
      name: 'Jitanka Sarkar',
      role: 'Website Developer',
      image: jitankaImg
    },
    {
      id: 'web-dev-5',
      name: 'Jishnu Roy',
      role: 'Website Developer',
      image: jishnuImg
    }
  ]
};
