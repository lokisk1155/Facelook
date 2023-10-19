import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faHeart,
  faDragon,
} from '@fortawesome/free-solid-svg-icons';
import './YourShortcuts.css';

function YourShortcuts() {
  const isViewportUnderCertainWidth = window.innerWidth < 768; // Adjust the width as per your needs

  if (isViewportUnderCertainWidth) {
    return null; // Render nothing if the viewport width is under the specified value
  }

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        width: '90%',
        cursor: 'pointer',
        marginTop: '65px',
      }}
    >
      <a
        className="icon-links"
        href="https://www.linkedin.com/in/shawn-mallon/"
        style={{ width: '90%', borderRadius: '5px', height: '75px' }}
      >
        {' '}
        <FontAwesomeIcon color="darkblue" size="xl" icon={faLinkedin} />
        <p style={{ paddingLeft: '5px' }}>{'Linkedin'}</p>
      </a>
      <a
        className="icon-links"
        href="https://github.com/lokisk1155/FaceOok"
        style={{ width: '90%', borderRadius: '5px', height: '75px' }}
      >
        {' '}
        <FontAwesomeIcon color="black" size="xl" icon={faGithub} />
        <p style={{ paddingLeft: '5px' }}>{'Github'}</p>
      </a>
      <a
        className="icon-links"
        href="https://mailmeaa.herokuapp.com/login"
        style={{ width: '90%', borderRadius: '5px', height: '75px' }}
      >
        {' '}
        <FontAwesomeIcon color="lightyellow" size="xl" icon={faEnvelope} />
        <p style={{ paddingLeft: '5px' }}>{'Mail'}</p>
      </a>
      <a
        className="icon-links"
        href="https://bejewelled-cactus-d214e5.netlify.app/"
        style={{ width: '90%', borderRadius: '5px', height: '75px' }}
      >
        {' '}
        <FontAwesomeIcon color="green" size="xl" icon={faDragon} />
        <p style={{ paddingLeft: '5px' }}>{'Threejs'}</p>
      </a>
      <a
        className="icon-links"
        href="https://github.com/rubyforgood/human-essentials"
        style={{ width: '90%', borderRadius: '5px', height: '75px' }}
      >
        {' '}
        <FontAwesomeIcon color="red" size="xl" icon={faHeart} />
        <p style={{ paddingLeft: '5px' }}>{'Ruby For Good'}</p>
      </a>
    </article>
  );
}

export default YourShortcuts;
