import Link from '../../components/link';
import PageTitle from '../../components/page-title';
import React from 'react';
import { withPrefix } from 'gatsby-link';

const AnemolifPage = () => (
   <main className="container">
      <article itemScope="" itemType="http://schema.org/SoftwareApplication">
         <PageTitle iconType="software" title="Anemolif" itemProp="name" />
         <img
            className="img-fluid my-3"
            src={withPrefix('/images/anemolif.png')}
            alt=""
            itemProp="image"
         />
         <div itemProp="description">
            <p>
               Anemolif è un programma che permette una gestione completa dei
               voti universitari arricchendo l'esperienza dell'utente con tante
               statistiche ed un grafico che mostra l'andamento dei voti.
            </p>
            <p>
               Anemolif è un software dall'interfaccia davvero semplice ed
               intuitiva. Non dovrete più annoiarvi accedendo ai siti
               istituzionali oppure compiendo lenti calcoli manuali. Anemolif è
               il programma che vi accompagnerà nella vostra carriera
               universitaria. Avrete sempre a portata di mano tutte le
               informazioni di cui avete bisogno come il numero di esami
               sostenuti, quelli che mancano al completamento del percorso di
               studio ed il numero di crediti formativi (CFU) acquisiti fino a
               quel momento.
            </p>
            <p>
               Anemolif, inoltre, consente di calcolare la media aritmetica, la
               media ponderata e la mediana dei voti, la loro frequenza, il voto
               con cui ci si presenterà alla seduta di laurea e tanto altro
               ancora. In aggiunta grazie ad alcuni calcoli statistici, il
               software riesce a darvi una previsione dei voti che dovrete
               prendere in futuro per ottenere la media a cui aspirate.
            </p>
            <p>
               Infine, il software è stand-alone, questo vuol dire che non
               necessita di alcuna installazione. Basta decomprimere il file
               .zip ed eseguire il programma. Semplice no?
            </p>
         </div>
         <div className="text-center">
            <Link
               to="/downloads/anemolif_2.1.zip"
               className="btn btn-primary btn-lg my-3"
               itemProp="downloadUrl"
            >
               Download
            </Link>
         </div>
         <section>
            <h3>Versione attuale</h3>
            <p>
               <span itemProp="softwareVersion">2.1</span> [
               <time datetime="2013-09-18" itemProp="dateModified">
                  18 Settembre 2013
               </time>
               ]
            </p>
         </section>
         <section>
            <h3>Requisiti di sistema</h3>
            <p itemProp="requirements">Microsoft .Net Framework 3.5</p>
         </section>
         <section itemProp="featureList">
            <h3>Caratteristiche in dettaglio</h3> <h4>Scheda Voti</h4>
            <p>
               Consente di salvare gli esami e le idoneità fatte in modo
               dettagliato.
            </p>
            <p> Elementi presenti: </p>
            <ul>
               <li>
                  Per gli esami: nome, voto, CFU, se contribuirà alla media e la
                  data in cui si è svolto l'esame
               </li>
               <li>Per le idoneità: nome, CFU e data</li>
            </ul>
            <h4>Scheda Resoconto</h4>
            <p>
               Fornisce un resoconto dei dati inseriti per una visione globale
               della propria carriera.
            </p>
            <p> Comprende i seguenti calcoli: </p>
            <ul>
               <li>Esami sostenuti</li> <li>Esami da sostenere</li>
               <li>CFU acquisiti</li> <li>Media aritmetica degli esami</li>
               <li>Una tabella indicante la frequenza dei voti ottenuti</li>
            </ul>
            <h4>Scheda Laurea</h4>
            <p>
               Questa scheda è molto interessante perché consente, una volta
               inserita la media a cui si aspira per il proprio percorso, di
               calcolare, in base agli esami già svolti, quale è il voto minimo
               da accettare all'esame successivo per arrivare alla media
               desiderata. Inoltre, esso permette di conoscere il proprio voto
               di presentazione alla tesi.
            </p>
            <p>
               In ultimo, dopo aver inserito i punti che si crede di avere alla
               tesi ed eventuali punti bonus, si otterrà una previsione del
               proprio voto di laurea.
            </p>
            <p> Elementi presenti:</p>
            <ul>
               <li>
                  Media degli esami per la presentazione alla tesi, a scelta tra
                  ponderata e aritmetica (vedere sezione relativa alle opzioni)
               </li>
               <li>Media aspirata</li>
               <li>Voto minimo da accettare al prossimo esame</li>
               <li>Punti per la tesi</li> <li>Punti bonus</li>
               <li>Voto di laurea</li>
            </ul>
            <h4>Scheda Grafico</h4>
            <p>Visualizza un grafico che mostra l'andamento dei propri voti.</p>
            <h5>Opzioni</h5>
            <p>
               Le opzioni concedono di impostare alcuni parametri nell'utilizzo
               del programma e sul modo in cui il file contenenti i dati vengono
               salvati.
            </p>
            <p> Le opzioni presenti sono:</p>
            <ul>
               <li>
                  Criptaggio del file: consente di salvare i dati in modo
                  cifrato così che nessuno possa venire a conoscenza dei vostri
                  dati
               </li>
               <li>
                  Password: permette di impostare una password che verrà
                  richiesta all'apertura del file. Un ulteriore modo per
                  salvaguardare la privacy
               </li>
               <li>
                  Cerca aggiornamenti all'avvio: Se attivo, ad ogni avvio il
                  programma cercherà la presenza di nuove versioni
               </li>
               <li>
                  Valore lode: Il valore della lode nel corso di laurea. Esso va
                  espresso tramite un numero con la virgola. Ad esempio, se ogni
                  4 lodi il vostro corso di laurea prevede un punto in più,
                  allora il valore da scrivere sarà 0,25
               </li>
               <li>
                  Metodo per il calcolo della media per il voto di presentazione
                  alla tesi: Indica il metodo tramite il quale viene calcolata
                  la media esami per sapere il voto di presentazione alla tesi.
                  I metodi possibili sono media aritmetica e media ponderata
                  (tiene conto dei CFU relativi ad ogni esame).
               </li>
            </ul>
            <h4>Strumenti</h4>
            <p>
               Consente il calcolo di media aritmetica, media ponderata e
               mediana dei propri voti consentendo di filtrare gli esami che non
               contribuiscono alla media finale.
            </p>
         </section>
         <section>
            <h3>Licenza d'uso</h3>
            <p>
               Anemolif è freeware, ciò vuol dire che è distribuibile a chiunque
               purché gratuitamente. Vendendolo si commette reato penale.
               Copyright © 2006 - 2017 Aurelio De Rosa. Tutti i diritti
               riservati.
            </p>
         </section>
         <div className="text-center">
            <Link
               to="/downloads/anemolif_2.1.zip"
               className="btn btn-primary btn-lg my-3"
               itemProp="downloadUrl"
            >
               Download
            </Link>
         </div>
      </article>
   </main>
);

export default AnemolifPage;
