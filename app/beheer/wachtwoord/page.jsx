import { nieuwWachtwoord } from '@/app/beheer/actions';
import Formulier from '@/components/beheer/Formulier';

export default function Wachtwoord() {
  return (
    <>
      <div className="b-kop"><h1>Wachtwoord instellen</h1></div>
      <div className="b-paneel" style={{ maxWidth: 520 }}>
        <Formulier actie={nieuwWachtwoord} knop="Wachtwoord opslaan">
          <div className="veld"><label htmlFor="ww">Nieuw wachtwoord</label><input id="ww" name="wachtwoord" type="password" autoComplete="new-password" required minLength={10} /><small>Minstens 10 tekens.</small></div>
          <div className="veld"><label htmlFor="ww2">Nogmaals</label><input id="ww2" name="wachtwoord2" type="password" autoComplete="new-password" required minLength={10} /></div>
        </Formulier>
      </div>
    </>
  );
}
