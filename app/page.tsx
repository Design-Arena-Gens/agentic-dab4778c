'use client'

import { useState } from 'react'

type TabType = 'incendie' | 'accessibilite'

interface ProjectData {
  // Informations générales
  nomProjet: string
  adresse: string
  maitreDOuvrage: string
  architecte: string
  surface: string

  // Incendie
  typeERP: string
  categorieERP: string
  activiteType: string
  effectifPublic: string
  effectifPersonnel: string
  niveaux: string
  sousSol: boolean
  hauteur: string
  moyensSecours: string[]
  systemesSecurite: string[]

  // Accessibilité
  typeAccessibilite: string
  parkingPMR: string
  cheminementExterieur: string
  accesEntree: string
  circulationInterieure: string
  sanitairesPMR: string
  equipementsAdaptes: string[]
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('incendie')
  const [projectData, setProjectData] = useState<ProjectData>({
    nomProjet: '',
    adresse: '',
    maitreDOuvrage: '',
    architecte: '',
    surface: '',
    typeERP: '',
    categorieERP: '',
    activiteType: '',
    effectifPublic: '',
    effectifPersonnel: '',
    niveaux: '',
    sousSol: false,
    hauteur: '',
    moyensSecours: [],
    systemesSecurite: [],
    typeAccessibilite: '',
    parkingPMR: '',
    cheminementExterieur: '',
    accesEntree: '',
    circulationInterieure: '',
    sanitairesPMR: '',
    equipementsAdaptes: []
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setProjectData(prev => ({ ...prev, [name]: checked }))
  }

  const handleArrayCheckbox = (category: 'moyensSecours' | 'systemesSecurite' | 'equipementsAdaptes', value: string) => {
    setProjectData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }))
  }

  const generateNoticeIncendie = () => {
    const content = `
NOTICE DE SÉCURITÉ INCENDIE
Conformément aux articles R.123-1 à R.123-55 du Code de la Construction et de l'Habitation

═══════════════════════════════════════════════════════════

1. IDENTIFICATION DU PROJET

Projet : ${projectData.nomProjet || '[À compléter]'}
Adresse : ${projectData.adresse || '[À compléter]'}
Maître d'ouvrage : ${projectData.maitreDOuvrage || '[À compléter]'}
Architecte : ${projectData.architecte || '[À compléter]'}
Surface totale : ${projectData.surface || '[À compléter]'} m²

─────────────────────────────────────────────────────────

2. CLASSEMENT DE L'ÉTABLISSEMENT

Type d'ERP : ${projectData.typeERP || '[À compléter]'}
Catégorie : ${projectData.categorieERP || '[À compléter]'}
Activité (type) : ${projectData.activiteType || '[À compléter]'}

Effectif public : ${projectData.effectifPublic || '[À compléter]'} personnes
Effectif personnel : ${projectData.effectifPersonnel || '[À compléter]'} personnes
Effectif total : ${projectData.effectifPublic && projectData.effectifPersonnel
  ? parseInt(projectData.effectifPublic) + parseInt(projectData.effectifPersonnel)
  : '[À compléter]'} personnes

─────────────────────────────────────────────────────────

3. DESCRIPTION DU BÂTIMENT

Nombre de niveaux : ${projectData.niveaux || '[À compléter]'}
Sous-sol : ${projectData.sousSol ? 'Oui' : 'Non'}
Hauteur du plancher bas du dernier niveau : ${projectData.hauteur || '[À compléter]'} m

─────────────────────────────────────────────────────────

4. DISPOSITIONS CONSTRUCTIVES

4.1. Résistance au feu de la structure
Conformément à l'article CO 12 de l'arrêté du 25 juin 1980 :
- Structure principale : Degré de résistance au feu adapté à la catégorie de l'ERP
- Stabilité au feu requise selon la hauteur et la catégorie

4.2. Distribution intérieure
Selon articles CO 24 à CO 28 :
- Cloisonnement coupe-feu entre locaux à risques
- Blocs-portes coupe-feu avec ferme-portes
- Recoupement des circulations horizontales si nécessaire

4.3. Façades et toitures
Selon articles CO 20 et CO 21 :
- Règle du C+D respectée pour les façades
- Toiture conforme aux exigences de réaction au feu

─────────────────────────────────────────────────────────

5. DÉGAGEMENTS ET ÉVACUATION

5.1. Sorties et dégagements
Conformément aux articles CO 38 à CO 45 :
- Nombre de sorties : Calculé selon effectif
- Largeur minimale des dégagements : 1 UP = 0,60 m
- Distance maximale à parcourir : Selon type et catégorie

5.2. Escaliers
Selon articles CO 47 à CO 51 :
- Escaliers protégés ou encloisonnés selon hauteur
- Largeur conforme aux unités de passage
- Main courante réglementaire

─────────────────────────────────────────────────────────

6. DÉSENFUMAGE

Conformément aux articles DF 1 à DF 11 :
- Désenfumage naturel ou mécanique selon configuration
- Commandes manuelles et automatiques
- Exutoires et amenées d'air conformes

─────────────────────────────────────────────────────────

7. INSTALLATIONS TECHNIQUES

7.1. Installations électriques
Selon articles EL 1 à EL 19 :
- Source de sécurité conforme
- Éclairage de sécurité : Évacuation et ambiance
- Installations en conformité NF C 15-100

7.2. Chauffage et ventilation
Selon articles CH 1 à CH 58 et GZ 1 à GZ 32 :
- Installation conforme à la réglementation
- Dispositifs de sécurité adaptés

7.3. Systèmes de sécurité incendie
${projectData.systemesSecurite.length > 0 ? projectData.systemesSecurite.join(', ') : '[À compléter]'}

─────────────────────────────────────────────────────────

8. MOYENS DE SECOURS

8.1. Moyens d'extinction
Conformément aux articles MS 18 à MS 41 :
${projectData.moyensSecours.length > 0 ? projectData.moyensSecours.map(m => `- ${m}`).join('\n') : '- [À compléter]'}

8.2. Service de sécurité incendie
Selon articles MS 45 à MS 48 :
- Personnel requis selon catégorie et type
- Formation SSI conforme

─────────────────────────────────────────────────────────

9. DISPOSITIONS SPÉCIFIQUES

Selon les dispositions particulières applicables au type d'activité :
- Référence aux articles spécifiques du règlement
- Dispositions complémentaires si nécessaire

─────────────────────────────────────────────────────────

10. CONCLUSION

Le projet respecte les prescriptions du règlement de sécurité contre l'incendie et la panique dans les établissements recevant du public.

Les dispositions constructives et les aménagements prévus permettent :
- L'évacuation rapide et sûre du public
- L'accessibilité aux services de secours
- La limitation de la propagation du feu

═══════════════════════════════════════════════════════════

Fait à __________, le __________

L'architecte
${projectData.architecte || '[Nom]'}

CACHET ET SIGNATURE
    `
    downloadNotice(content, 'Notice_Securite_Incendie.txt')
  }

  const generateNoticeAccessibilite = () => {
    const content = `
NOTICE D'ACCESSIBILITÉ
Conformément à l'arrêté du 20 avril 2017 et au décret n°2006-555 du 17 mai 2006

═══════════════════════════════════════════════════════════

1. IDENTIFICATION DU PROJET

Projet : ${projectData.nomProjet || '[À compléter]'}
Adresse : ${projectData.adresse || '[À compléter]'}
Maître d'ouvrage : ${projectData.maitreDOuvrage || '[À compléter]'}
Architecte : ${projectData.architecte || '[À compléter]'}
Surface totale : ${projectData.surface || '[À compléter]'} m²

─────────────────────────────────────────────────────────

2. CADRE RÉGLEMENTAIRE

Type d'établissement : ${projectData.typeAccessibilite || '[À compléter]'}

Le projet respecte les dispositions de :
- La loi n°2005-102 du 11 février 2005 pour l'égalité des droits et des chances
- Le décret n°2006-555 du 17 mai 2006
- L'arrêté du 20 avril 2017 relatif à l'accessibilité aux personnes handicapées des ERP et IOP

─────────────────────────────────────────────────────────

3. STATIONNEMENT AUTOMOBILE

Conformément à l'article 3 de l'arrêté du 20 avril 2017 :

Nombre de places PMR : ${projectData.parkingPMR || '[À compléter]'}
Localisation : [À préciser]
Caractéristiques :
- Largeur minimale : 3,30 m
- Signalisation verticale et horizontale conforme
- Cheminement accessible depuis les places jusqu'à l'entrée

─────────────────────────────────────────────────────────

4. CHEMINEMENT EXTÉRIEUR

Conformément à l'article 2 :

${projectData.cheminementExterieur || '[À compléter - Décrire le cheminement]'}

Caractéristiques techniques :
- Largeur minimale : 1,40 m (rétrécissement ponctuel à 1,20 m autorisé)
- Pente : ≤ 5% (si > 5%, aménagements spécifiques requis)
- Dévers : ≤ 2%
- Sol : Revêtement non meuble, non glissant, sans obstacle
- Éclairage : Minimum 20 lux

Ressauts et seuils :
- Ressauts ≤ 2 cm (≤ 4 cm si chanfrein)
- Absence de trous ou fentes > 2 cm

─────────────────────────────────────────────────────────

5. ACCÈS À L'ÉTABLISSEMENT

Conformément à l'article 4 :

${projectData.accesEntree || "[À compléter - Décrire l'accès]"}

Caractéristiques de l'entrée :
- Repérage : Entrée principale utilisable par tous
- Système d'ouverture : [Manuel/Automatique]
- Largeur de passage utile : >= 0,90 m (1,40 m si porte battante)
- Effort de manoeuvre : <= 50 N
- Visibilité : Paroi vitrée signalée

Dispositifs d'accès :
- Interphone à hauteur adaptée (0,90 m - 1,30 m)
- Dispositifs de commande accessibles et contrastés

─────────────────────────────────────────────────────────

6. ACCUEIL DU PUBLIC

Conformément à l'article 5 :

Banque d'accueil :
- Hauteur adaptée : 0,80 m (avec espace libre sous plan)
- Ou dispositif d'appel à hauteur accessible
- Visibilité et signalétique adaptées
- Éclairage suffisant (200 lux mini)

Équipements et mobiliers :
- Contraste visuel des éléments structurants
- Signalétique adaptée (caractères ≥ 15 mm)

─────────────────────────────────────────────────────────

7. CIRCULATIONS INTÉRIEURES HORIZONTALES

Conformément à l'article 6 :

${projectData.circulationInterieure || '[À compléter - Décrire les circulations]'}

Caractéristiques techniques :
- Largeur minimale : 1,40 m (rétrécissement à 1,20 m sur faible longueur)
- Pente : ≤ 5%
- Aire de rotation : Ø 1,50 m tous les 10 m en cas de rétrécissement
- Revêtement : Non glissant, sans obstacle

Portes :
- Largeur passage utile : ≥ 0,90 m
- Effort d'ouverture : ≤ 50 N
- Espace de manœuvre : 1,70 m devant chaque porte

─────────────────────────────────────────────────────────

8. CIRCULATIONS INTÉRIEURES VERTICALES

Conformément à l'article 7 :

8.1. Escaliers
- Largeur minimale : 1,40 m (1,20 m si rail installé)
- Main courante : Des deux côtés, prolongée horizontalement
- Hauteur des mains courantes : 0,80 m - 1,00 m
- Nez de marches : Contrastés et non glissants
- Contremarches : Pleines
- Première et dernière marches : Contrastées et éveil de vigilance

8.2. Ascenseurs
- Cabine minimale : 1,10 m × 1,40 m
- Commandes : Hauteur 0,90 m - 1,30 m
- Signalisation sonore et visuelle
- Dispositif de communication accessible

─────────────────────────────────────────────────────────

9. SANITAIRES

Conformément à l'article 12 :

Nombre de sanitaires PMR : ${projectData.sanitairesPMR || '[À compléter]'}

Caractéristiques des sanitaires adaptés :
- Espace d'usage : Ø 1,50 m devant chaque équipement
- Cuvette : Hauteur 0,45 m - 0,50 m
- Barres d'appui : Latérales et relevables
- Lave-mains accessible : Hauteur ≤ 0,85 m
- Commandes : Hauteur 0,90 m - 1,30 m
- Signalisation conforme (pictogrammes)

─────────────────────────────────────────────────────────

10. ÉQUIPEMENTS ET PRESTATIONS

Équipements adaptés mis en place :
${projectData.equipementsAdaptes.length > 0 ? projectData.equipementsAdaptes.map(e => `- ${e}`).join('\n') : '[À compléter]'}

Caractéristiques :
- Hauteur des commandes : 0,90 m - 1,30 m
- Dispositifs contrastés visuellement
- Informations en relief et braille si nécessaire

─────────────────────────────────────────────────────────

11. SIGNALÉTIQUE ET REPÉRAGE

Conformément aux articles 14 et 15 :

- Signalisation des cheminements
- Repérage des obstacles et parois vitrées
- Numérotation des étages en relief et braille
- Pictogrammes normalisés
- Contraste visuel des éléments de signalétique

─────────────────────────────────────────────────────────

12. ÉCLAIRAGE

Niveaux d'éclairement conformes :
- Circulations : 100 lux
- Escaliers : 150 lux
- Accueil : 200 lux
- Éclairage de sécurité conforme

─────────────────────────────────────────────────────────

13. QUALITÉ D'USAGE ET ACOUSTIQUE

Conformément à l'article 11 :

- Signaux sonores doublés de signaux visuels
- Qualité acoustique des espaces
- Dispositifs d'alarme adaptés (sonores et visuels)

─────────────────────────────────────────────────────────

14. CONCLUSION

Le projet respecte l'ensemble des dispositions réglementaires relatives à l'accessibilité aux personnes handicapées.

Les aménagements prévus permettent à toute personne, quel que soit son handicap (moteur, visuel, auditif, mental), de :
- Accéder à l'établissement
- Y circuler en toute autonomie
- Recevoir les informations diffusées
- Bénéficier des prestations offertes

═══════════════════════════════════════════════════════════

Fait à __________, le __________

L'architecte
${projectData.architecte || '[Nom]'}

CACHET ET SIGNATURE
    `
    downloadNotice(content, 'Notice_Accessibilite.txt')
  }

  const downloadNotice = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🏛️ Générateur de Notices Réglementaires</h1>
        <p>Sécurité Incendie & Accessibilité PMR - Conforme aux normes françaises</p>
      </div>

      <div className="content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'incendie' ? 'active' : ''}`}
            onClick={() => setActiveTab('incendie')}
          >
            🔥 Sécurité Incendie
          </button>
          <button
            className={`tab ${activeTab === 'accessibilite' ? 'active' : ''}`}
            onClick={() => setActiveTab('accessibilite')}
          >
            ♿ Accessibilité PMR
          </button>
        </div>

        {/* Informations générales */}
        <div className="form-section">
          <h2>📋 Informations Générales du Projet</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Nom du projet *</label>
              <input
                type="text"
                name="nomProjet"
                value={projectData.nomProjet}
                onChange={handleInputChange}
                placeholder="Ex: Centre commercial Les Arcades"
              />
            </div>
            <div className="form-group">
              <label>Adresse complète *</label>
              <input
                type="text"
                name="adresse"
                value={projectData.adresse}
                onChange={handleInputChange}
                placeholder="Numéro, rue, code postal, ville"
              />
            </div>
            <div className="form-group">
              <label>Maître d'ouvrage *</label>
              <input
                type="text"
                name="maitreDOuvrage"
                value={projectData.maitreDOuvrage}
                onChange={handleInputChange}
                placeholder="Nom du maître d'ouvrage"
              />
            </div>
            <div className="form-group">
              <label>Architecte *</label>
              <input
                type="text"
                name="architecte"
                value={projectData.architecte}
                onChange={handleInputChange}
                placeholder="Votre nom ou agence"
              />
            </div>
            <div className="form-group">
              <label>Surface totale (m²) *</label>
              <input
                type="number"
                name="surface"
                value={projectData.surface}
                onChange={handleInputChange}
                placeholder="Ex: 2500"
              />
            </div>
          </div>
        </div>

        {/* Formulaire Incendie */}
        {activeTab === 'incendie' && (
          <>
            <div className="form-section">
              <h2>🔥 Classement ERP</h2>
              <div className="info-box">
                <strong>Information:</strong>
                Le classement de l'ERP détermine les règles de sécurité applicables selon l'arrêté du 25 juin 1980.
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Type d'ERP *</label>
                  <select name="typeERP" value={projectData.typeERP} onChange={handleInputChange}>
                    <option value="">Sélectionner...</option>
                    <option value="J">J - Structures d'accueil pour personnes âgées</option>
                    <option value="L">L - Salles d'audition, conférences, spectacles</option>
                    <option value="M">M - Magasins de vente, centres commerciaux</option>
                    <option value="N">N - Restaurants et débits de boissons</option>
                    <option value="O">O - Hôtels et pensions de famille</option>
                    <option value="P">P - Salles de danse et salles de jeux</option>
                    <option value="R">R - Établissements d'enseignement</option>
                    <option value="S">S - Bibliothèques, centres de documentation</option>
                    <option value="T">T - Salles d'exposition</option>
                    <option value="U">U - Établissements de soins</option>
                    <option value="V">V - Établissements de culte</option>
                    <option value="W">W - Administrations, banques, bureaux</option>
                    <option value="X">X - Établissements sportifs couverts</option>
                    <option value="Y">Y - Musées</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Catégorie ERP *</label>
                  <select name="categorieERP" value={projectData.categorieERP} onChange={handleInputChange}>
                    <option value="">Sélectionner...</option>
                    <option value="1">1ère catégorie (&gt; 1500 personnes)</option>
                    <option value="2">2ème catégorie (701 à 1500 personnes)</option>
                    <option value="3">3ème catégorie (301 à 700 personnes)</option>
                    <option value="4">4ème catégorie (&lt; 300 personnes)</option>
                    <option value="5">5ème catégorie (seuils spécifiques par type)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Activité principale</label>
                  <input
                    type="text"
                    name="activiteType"
                    value={projectData.activiteType}
                    onChange={handleInputChange}
                    placeholder="Ex: Commerce de détail"
                  />
                </div>
              </div>

              <h3>Effectifs</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Effectif du public *</label>
                  <input
                    type="number"
                    name="effectifPublic"
                    value={projectData.effectifPublic}
                    onChange={handleInputChange}
                    placeholder="Nombre de personnes"
                  />
                </div>
                <div className="form-group">
                  <label>Effectif du personnel *</label>
                  <input
                    type="number"
                    name="effectifPersonnel"
                    value={projectData.effectifPersonnel}
                    onChange={handleInputChange}
                    placeholder="Nombre de personnes"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>🏢 Caractéristiques du Bâtiment</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre de niveaux *</label>
                  <input
                    type="number"
                    name="niveaux"
                    value={projectData.niveaux}
                    onChange={handleInputChange}
                    placeholder="Ex: 3"
                  />
                </div>

                <div className="form-group">
                  <label>Hauteur plancher dernier niveau (m)</label>
                  <input
                    type="number"
                    name="hauteur"
                    value={projectData.hauteur}
                    onChange={handleInputChange}
                    placeholder="Ex: 8.5"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="sousSol"
                  name="sousSol"
                  checked={projectData.sousSol}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="sousSol">Présence de sous-sol</label>
              </div>
            </div>

            <div className="form-section">
              <h2>🧯 Moyens de Secours</h2>
              <div className="warning-box">
                Les moyens de secours doivent être conformes aux articles MS 18 à MS 41 du règlement de sécurité.
              </div>

              <h3>Moyens d'extinction</h3>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="extincteurs"
                  checked={projectData.moyensSecours.includes('Extincteurs portatifs (un appareil pour 200 m² minimum)')}
                  onChange={() => handleArrayCheckbox('moyensSecours', 'Extincteurs portatifs (un appareil pour 200 m² minimum)')}
                />
                <label htmlFor="extincteurs">Extincteurs portatifs</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="ria"
                  checked={projectData.moyensSecours.includes('Robinets d\'Incendie Armés (RIA)')}
                  onChange={() => handleArrayCheckbox('moyensSecours', 'Robinets d\'Incendie Armés (RIA)')}
                />
                <label htmlFor="ria">RIA (Robinets d'Incendie Armés)</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="colonnes"
                  checked={projectData.moyensSecours.includes('Colonnes sèches ou humides')}
                  onChange={() => handleArrayCheckbox('moyensSecours', 'Colonnes sèches ou humides')}
                />
                <label htmlFor="colonnes">Colonnes sèches/humides</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="sprinklers"
                  checked={projectData.moyensSecours.includes('Système d\'extinction automatique (sprinklers)')}
                  onChange={() => handleArrayCheckbox('moyensSecours', 'Système d\'extinction automatique (sprinklers)')}
                />
                <label htmlFor="sprinklers">Sprinklers</label>
              </div>

              <h3>Systèmes de Sécurité Incendie (SSI)</h3>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="ssi"
                  checked={projectData.systemesSecurite.includes('Système de Sécurité Incendie (catégorie A, B, C, D ou E)')}
                  onChange={() => handleArrayCheckbox('systemesSecurite', 'Système de Sécurité Incendie (catégorie A, B, C, D ou E)')}
                />
                <label htmlFor="ssi">SSI (Système de Sécurité Incendie)</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="dai"
                  checked={projectData.systemesSecurite.includes('Détection Automatique d\'Incendie (DAI)')}
                  onChange={() => handleArrayCheckbox('systemesSecurite', 'Détection Automatique d\'Incendie (DAI)')}
                />
                <label htmlFor="dai">DAI (Détection Automatique)</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="cmsi"
                  checked={projectData.systemesSecurite.includes('Centralisateur de Mise en Sécurité Incendie (CMSI)')}
                  onChange={() => handleArrayCheckbox('systemesSecurite', 'Centralisateur de Mise en Sécurité Incendie (CMSI)')}
                />
                <label htmlFor="cmsi">CMSI</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="desenfumage"
                  checked={projectData.systemesSecurite.includes('Système de désenfumage naturel ou mécanique')}
                  onChange={() => handleArrayCheckbox('systemesSecurite', 'Système de désenfumage naturel ou mécanique')}
                />
                <label htmlFor="desenfumage">Désenfumage</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="alarme"
                  checked={projectData.systemesSecurite.includes('Alarme générale type 1, 2, 3 ou 4')}
                  onChange={() => handleArrayCheckbox('systemesSecurite', 'Alarme générale type 1, 2, 3 ou 4')}
                />
                <label htmlFor="alarme">Alarme générale</label>
              </div>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={generateNoticeIncendie}>
                📄 Générer Notice Incendie
              </button>
            </div>
          </>
        )}

        {/* Formulaire Accessibilité */}
        {activeTab === 'accessibilite' && (
          <>
            <div className="form-section">
              <h2>♿ Type d'Établissement</h2>
              <div className="info-box">
                <strong>Réglementation applicable:</strong>
                Arrêté du 20 avril 2017 relatif à l'accessibilité aux personnes handicapées des ERP et IOP lors de leur construction ou création.
              </div>

              <div className="form-group">
                <label>Type d'établissement *</label>
                <select name="typeAccessibilite" value={projectData.typeAccessibilite} onChange={handleInputChange}>
                  <option value="">Sélectionner...</option>
                  <option value="ERP neuf">ERP neuf</option>
                  <option value="ERP existant avec travaux">ERP existant avec travaux</option>
                  <option value="IOP (Installation Ouverte au Public)">IOP (Installation Ouverte au Public)</option>
                  <option value="Bâtiment d'habitation collectif">Bâtiment d'habitation collectif</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h2>🅿️ Stationnement</h2>
              <div className="form-group">
                <label>Nombre de places PMR *</label>
                <input
                  type="text"
                  name="parkingPMR"
                  value={projectData.parkingPMR}
                  onChange={handleInputChange}
                  placeholder="Ex: 5 places (2% du total, minimum 1)"
                />
              </div>
              <div className="info-box">
                <strong>Règle:</strong> 2% des places totales avec un minimum d'1 place PMR. Dimensions : 3,30 m × 5,00 m.
              </div>
            </div>

            <div className="form-section">
              <h2>🚶 Cheminement Extérieur</h2>
              <div className="form-group">
                <label>Description du cheminement extérieur *</label>
                <textarea
                  name="cheminementExterieur"
                  value={projectData.cheminementExterieur}
                  onChange={handleInputChange}
                  placeholder="Décrire le cheminement depuis le parking/voirie jusqu'à l'entrée du bâtiment (largeur, pente, revêtement, éclairage...)"
                  rows={4}
                />
              </div>
              <div className="info-box">
                <strong>Exigences:</strong>
                <ul>
                  <li>Largeur minimale : 1,40 m (1,20 m sur courte distance)</li>
                  <li>Pente : ≤ 5% (si &gt; 5%, paliers de repos requis)</li>
                  <li>Sol non meuble, non glissant, sans obstacle</li>
                  <li>Ressauts ≤ 2 cm</li>
                </ul>
              </div>
            </div>

            <div className="form-section">
              <h2>🚪 Accès et Entrée</h2>
              <div className="form-group">
                <label>Description de l'accès principal *</label>
                <textarea
                  name="accesEntree"
                  value={projectData.accesEntree}
                  onChange={handleInputChange}
                  placeholder="Décrire l'entrée principale (type de porte, largeur, système d'ouverture, seuil, dispositifs de commande...)"
                  rows={4}
                />
              </div>
              <div className="info-box">
                <strong>Exigences:</strong>
                <ul>
                  <li>Largeur passage utile ≥ 0,90 m</li>
                  <li>Effort d'ouverture ≤ 50 N</li>
                  <li>Espace de manœuvre de porte : 1,70 m devant la porte</li>
                  <li>Repérage visuel des portes vitrées</li>
                </ul>
              </div>
            </div>

            <div className="form-section">
              <h2>🔄 Circulation Intérieure</h2>
              <div className="form-group">
                <label>Description des circulations horizontales *</label>
                <textarea
                  name="circulationInterieure"
                  value={projectData.circulationInterieure}
                  onChange={handleInputChange}
                  placeholder="Décrire les couloirs, paliers, circulations (largeur, revêtement, portes, aires de manœuvre...)"
                  rows={4}
                />
              </div>
              <div className="info-box">
                <strong>Exigences:</strong>
                <ul>
                  <li>Largeur minimale : 1,40 m (1,20 m ponctuellement)</li>
                  <li>Aire de rotation Ø 1,50 m à chaque changement de direction</li>
                  <li>Portes : passage utile ≥ 0,90 m</li>
                  <li>Escaliers : largeur 1,40 m, mains courantes des 2 côtés</li>
                </ul>
              </div>
            </div>

            <div className="form-section">
              <h2>🚽 Sanitaires</h2>
              <div className="form-group">
                <label>Nombre et localisation des sanitaires PMR *</label>
                <input
                  type="text"
                  name="sanitairesPMR"
                  value={projectData.sanitairesPMR}
                  onChange={handleInputChange}
                  placeholder="Ex: 1 cabinet PMR par niveau (RDC et étage)"
                />
              </div>
              <div className="info-box">
                <strong>Règle:</strong> Au moins un cabinet d'aisance aménagé pour les PMR par niveau où des sanitaires sont prévus pour le public.
                Espace d'usage Ø 1,50 m, hauteur cuvette 0,45-0,50 m, barres d'appui.
              </div>
            </div>

            <div className="form-section">
              <h2>⚙️ Équipements et Dispositifs</h2>
              <h3>Sélectionner les équipements adaptés prévus :</h3>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="ascenseur"
                  checked={projectData.equipementsAdaptes.includes('Ascenseur accessible (cabine 1,10 × 1,40 m minimum)')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Ascenseur accessible (cabine 1,10 × 1,40 m minimum)')}
                />
                <label htmlFor="ascenseur">Ascenseur accessible</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rampe"
                  checked={projectData.equipementsAdaptes.includes('Rampes d\'accès (pente ≤ 5%)')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Rampes d\'accès (pente ≤ 5%)')}
                />
                <label htmlFor="rampe">Rampes d'accès</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="signaletique"
                  checked={projectData.equipementsAdaptes.includes('Signalétique adaptée (relief et braille)')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Signalétique adaptée (relief et braille)')}
                />
                <label htmlFor="signaletique">Signalétique relief et braille</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="contraste"
                  checked={projectData.equipementsAdaptes.includes('Contrastes visuels (bandes de vigilance, repérage obstacles)')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Contrastes visuels (bandes de vigilance, repérage obstacles)')}
                />
                <label htmlFor="contraste">Contrastes visuels et bandes de vigilance</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="alarme-pmr"
                  checked={projectData.equipementsAdaptes.includes('Alarmes sonores et visuelles')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Alarmes sonores et visuelles')}
                />
                <label htmlFor="alarme-pmr">Alarmes sonores et visuelles</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="accueil-adapte"
                  checked={projectData.equipementsAdaptes.includes('Banque d\'accueil adaptée (hauteur 0,80 m)')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Banque d\'accueil adaptée (hauteur 0,80 m)')}
                />
                <label htmlFor="accueil-adapte">Banque d'accueil adaptée</label>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="boucle-magnetique"
                  checked={projectData.equipementsAdaptes.includes('Boucle magnétique pour malentendants')}
                  onChange={() => handleArrayCheckbox('equipementsAdaptes', 'Boucle magnétique pour malentendants')}
                />
                <label htmlFor="boucle-magnetique">Boucle magnétique</label>
              </div>
            </div>

            <div className="button-group">
              <button className="btn btn-primary" onClick={generateNoticeAccessibilite}>
                📄 Générer Notice Accessibilité
              </button>
            </div>
          </>
        )}

        <div className="info-box" style={{marginTop: '30px'}}>
          <strong>💡 Conseil:</strong> Remplissez tous les champs marqués d'un astérisque (*) pour générer une notice complète.
          Les notices générées sont au format texte et peuvent être complétées, mises en forme et exportées en PDF avec votre logiciel de traitement de texte préféré.
        </div>
      </div>
    </div>
  )
}
