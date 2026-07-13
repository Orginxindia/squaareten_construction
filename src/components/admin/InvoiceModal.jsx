/* ============================================================
   INVOICE / QUOTATION MODAL — Printable Cost Estimation PDF Creator
   ============================================================ */
import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { convertSqftToCent } from '../../lib/areaUtils';

export default function InvoiceModal({ booking, plots, onClose }) {
  // Find corresponding plot in layout database
  const matchedPlot = plots.find(
    (p) => booking && p.plot_number === booking.plot_number && p.phase === Number(booking.phase)
  );

  // Initial State Setup
  const [clientName, setClientName] = useState(booking?.customer_name || '');
  const [date, setDate] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });

  const [plotArea, setPlotArea] = useState(matchedPlot?.plot_area || 0);
  const [roadArea, setRoadArea] = useState(matchedPlot?.road_area || 0);
  const [totalArea, setTotalArea] = useState(matchedPlot?.total_area || 0);
  const [cents, setCents] = useState(() => {
    if (matchedPlot?.total_area) {
      return convertSqftToCent(matchedPlot.total_area);
    }
    return '0.00';
  });

  const [builtupArea, setBuiltupArea] = useState(1000);
  const [projectTitle, setProjectTitle] = useState(
    'SQUAARETEN CONSTRUCTION – KARUPPAIAH NAGAR'
  );
  const [includePlot, setIncludePlot] = useState(true);
  const [includeBuilding, setIncludeBuilding] = useState(true);
  const [includeBorewell, setIncludeBorewell] = useState(true);

  const [siteLocation, setSiteLocation] = useState(() => {
    if (!booking) return '';
    const facingStr = matchedPlot?.facing ? `${matchedPlot.facing.toUpperCase()} FACING` : 'EAST FACING';
    const phaseStr = `KARUPPIAH NAGAR PHASE ${String(booking.phase).padStart(2, '0')}`;
    return `PLOT NO ${booking.plot_number}– ${facingStr},\n${phaseStr}\nPOTHUMBU, MADURAI`;
  });

  // Financial values
  const [plotRate, setPlotRate] = useState(725000); // per cent
  const [buildingRate, setBuildingRate] = useState(2650); // per sft
  const [borewellCost, setBorewellCost] = useState(200000); // lump sum
  const [advanceAmount, setAdvanceAmount] = useState(booking?.advance_amount || 0);
  const [noteText, setNoteText] = useState(
    'THIS QUOTE IS TENTATIVE NOT THE FINAL ONE! AND WILL BE FINALIZE ACCORDING TO CLIENT REQUIREMENT.'
  );

  // Sync state if booking updates
  useEffect(() => {
    if (booking) {
      setClientName(booking.customer_name || '');
      setAdvanceAmount(booking.advance_amount || 0);
      setProjectTitle('SQUAARETEN CONSTRUCTION – KARUPPAIAH NAGAR');

      if (matchedPlot) {
        setPlotArea(matchedPlot.plot_area || 0);
        setRoadArea(matchedPlot.road_area || 0);
        setTotalArea(matchedPlot.total_area || 0);
        setCents(convertSqftToCent(matchedPlot.total_area));

        const facingStr = matchedPlot.facing ? `${matchedPlot.facing.toUpperCase()} FACING` : 'EAST FACING';
        const phaseStr = `KARUPPIAH NAGAR PHASE ${String(booking.phase).padStart(2, '0')}`;
        setSiteLocation(`PLOT NO ${booking.plot_number}– ${facingStr},\n${phaseStr}\nPOTHUMBU, MADURAI`);
      }
    }
  }, [booking, plots]);

  if (!booking) return null;

  // Recalculate cents if totalArea is edited manually
  const handleTotalAreaChange = (val) => {
    setTotalArea(val);
    if (!isNaN(val) && val > 0) {
      setCents(convertSqftToCent(val));
    }
  };

  // Computations
  const plotAmount = includePlot ? Math.round(Number(cents) * Number(plotRate)) : 0;
  const buildingAmount = includeBuilding ? Math.round(Number(builtupArea) * Number(buildingRate)) : 0;
  const borewellAmount = includeBorewell ? Number(borewellCost) : 0;
  const totalAmount = plotAmount + buildingAmount + borewellAmount;

  // Direct A4 PDF Download using html2pdf.js via standard Blob URL download
  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-quotation-sheet');
    
    const opt = {
      margin: 0,
      filename: `Quotation_Plot_${booking.plot_number}_${(clientName || 'Client').trim().replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Output PDF as blob and trigger standard download to avoid base64 data URIs which browsers block/corrupt
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Quotation_Plot_${booking.plot_number}_${(clientName || 'Client').trim().replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.error('PDF Generation failed:', err);
        alert('PDF Generation failed. Please try again.');
      });
  };

  return (
    <div className="admin-modal-overlay invoice-overlay no-print" onClick={onClose} data-lenis-prevent>
      <div className="invoice-modal-container" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        
        {/* Left Side: Configuration Controls */}
        <div className="invoice-config-panel no-print">
          <div className="invoice-config-header">
            <h3>Quotation Settings</h3>
            <p>Customize estimated metrics before printing</p>
          </div>
          <div className="invoice-config-body">
            
            {/* Section 1: Client & Project Info */}
            <div className="invoice-config-section-title">Client & Project Details</div>

            <div className="admin-form-group">
              <label>Client Name</label>
              <input 
                type="text" 
                className="admin-input" 
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Project Date</label>
              <input 
                type="text" 
                className="admin-input" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                placeholder="DD-MM-YYYY" 
              />
            </div>

            <div className="admin-form-group">
              <label>Project Title Box</label>
              <input 
                type="text" 
                className="admin-input" 
                value={projectTitle} 
                onChange={(e) => setProjectTitle(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Site Location Details</label>
              <textarea 
                className="admin-input admin-textarea" 
                rows="3" 
                value={siteLocation} 
                onChange={(e) => setSiteLocation(e.target.value)} 
              />
            </div>

            {/* Section 2: Dimensions & Areas */}
            <div className="invoice-config-section-title">Dimensions & Areas</div>

            <div className="invoice-config-row">
              <div className="admin-form-group">
                <label>Plot Area (Sq.Ft)</label>
                <input 
                  type="number" 
                  className="admin-input" 
                  value={plotArea} 
                  onChange={(e) => setPlotArea(e.target.value)} 
                />
              </div>
              <div className="admin-form-group">
                <label>Road Area (Sq.Ft)</label>
                <input 
                  type="number" 
                  className="admin-input" 
                  value={roadArea} 
                  onChange={(e) => setRoadArea(e.target.value)} 
                />
              </div>
            </div>

            <div className="invoice-config-row">
              <div className="admin-form-group">
                <label>Total Area (Sq.Ft)</label>
                <input 
                  type="number" 
                  className="admin-input" 
                  value={totalArea} 
                  onChange={(e) => handleTotalAreaChange(e.target.value)} 
                />
              </div>
              <div className="admin-form-group">
                <label>Cents Qty</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="admin-input" 
                  value={cents} 
                  onChange={(e) => setCents(e.target.value)} 
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label>Built-up Area (Sq.Ft)</label>
              <input 
                type="number" 
                className="admin-input" 
                value={builtupArea} 
                onChange={(e) => setBuiltupArea(e.target.value)} 
              />
            </div>

            {/* Section 3: Cost Estimates & Financials */}
            <div className="invoice-config-section-title">Financial Details & Rates</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '0.75rem', padding: '0.25rem 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includePlot} 
                  onChange={(e) => setIncludePlot(e.target.checked)}
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                Include Plot Cost
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeBuilding} 
                  onChange={(e) => setIncludeBuilding(e.target.checked)}
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                Include Building Cost
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeBorewell} 
                  onChange={(e) => setIncludeBorewell(e.target.checked)}
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                Include Borewell Cost
              </label>
            </div>
            
            <div className="admin-form-group">
              <label>Plot Rate (per Cent - Rs.)</label>
              <input 
                type="number" 
                className="admin-input" 
                value={plotRate} 
                onChange={(e) => setPlotRate(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Building SFT Rate (Rs.)</label>
              <input 
                type="number" 
                className="admin-input" 
                value={buildingRate} 
                onChange={(e) => setBuildingRate(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Borewell & Elec Cost (L.S - Rs.)</label>
              <input 
                type="number" 
                className="admin-input" 
                value={borewellCost} 
                onChange={(e) => setBorewellCost(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Advance Amount (Rs.)</label>
              <input 
                type="number" 
                className="admin-input" 
                value={advanceAmount} 
                onChange={(e) => setAdvanceAmount(e.target.value)} 
              />
            </div>

            <div className="admin-form-group">
              <label>Tentative Warning Note</label>
              <textarea 
                className="admin-input admin-textarea" 
                rows="2" 
                value={noteText} 
                onChange={(e) => setNoteText(e.target.value)} 
              />
            </div>

          </div>
          <div className="invoice-config-footer">
            <button className="admin-btn admin-btn--outline" onClick={onClose}>Close</button>
            <button className="admin-btn admin-btn--primary" onClick={handleDownloadPDF}>
              📥 Download PDF
            </button>
          </div>
        </div>

        {/* Right Side: Live Printable A4 Quotation Page */}
        <div className="invoice-preview-container">
          <div className="invoice-a4-page" id="printable-quotation-sheet">
            
            {/* Header section matching exact layout */}
            <div className="invoice-header-section">
              <div className="invoice-logo-wrapper">
                <img src="/assets/images/logo.png" alt="Squaare Ten Logo" />
              </div>
              <div className="invoice-title-wrapper">
                <h1 className="invoice-company-brand">SQUAARETEN CONSTRUCTION PVT. LTD.</h1>
                <p className="invoice-company-services">CONSTRUCTION | INTERIOR | TURNKEY PROJECTS</p>
                <p className="invoice-company-email-id">squaaretenconstruction@gmail.com</p>
                <p className="invoice-company-contact-numbers">📞 9150765025, 9750008484</p>
              </div>
            </div>

            <div className="invoice-hairline-separator" />

            {/* Document Header Metadata */}
            <div className="invoice-document-meta">
              <div className="invoice-date-row text-right">
                <span className="invoice-date-stamp">{date}</span>
              </div>
              <h2 className="invoice-heading-main">COST ESTIMATION</h2>
            </div>

            {/* Grid Box Section */}
            <div className="invoice-grid-box-layout">
              {/* TO Box */}
              <div className="invoice-grid-cell client-area-cell">
                <div className="cell-client-to">
                  <strong>TO,</strong>
                  <p className="highlight-client-name">CLIENT : {clientName.toUpperCase()}</p>
                </div>
                <div className="cell-area-statement">
                  <h3 className="cell-subtitle-underlined">AREA STATEMENT:</h3>
                  <div className="statement-line">PLOT AREA – {plotArea} SQFT</div>
                  <div className="statement-line">ROAD AREA – {roadArea} SQFT</div>
                  <div className="statement-line">
                    TOTAL AREA = {totalArea} SQFT ({cents} CENTS) <span className="highlight-with-road">WITH ROAD</span>
                  </div>
                  {includeBuilding && (
                    <div className="statement-line" style={{ marginTop: '0.5rem' }}>
                      BUILTUP AREA – {builtupArea} SQFT (GROUND FLOOR)
                    </div>
                  )}
                </div>
              </div>

              {/* Right Stack */}
              <div className="invoice-grid-cell-stack">
                {/* Project Title Box */}
                <div className="invoice-grid-cell title-cell">
                  <h3 className="cell-subtitle">PROJECT TITLE:</h3>
                  <p className="highlight-project-title">{projectTitle}</p>
                </div>
                {/* Site Location Box */}
                <div className="invoice-grid-cell location-cell">
                  <h3 className="cell-subtitle">SITE LOCATION:</h3>
                  {siteLocation.split('\n').map((line, idx) => (
                    <p key={idx} className="location-line">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing Details Table */}
            <table className="invoice-pricing-table">
              <thead>
                <tr>
                  <th style={{ width: '8%' }}>S.NO.</th>
                  <th style={{ width: '47%' }}>DESCRIPTION</th>
                  <th style={{ width: '10%' }}>UNITS</th>
                  <th style={{ width: '10%' }}>QTY</th>
                  <th style={{ width: '12%' }}>RATE</th>
                  <th style={{ width: '13%' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const pricingRows = [];
                  if (includePlot) {
                    pricingRows.push({
                      desc: `PLOT – ${booking.plot_number} (WITH ROAD AREA)`,
                      unit: 'CENT',
                      qty: cents,
                      rate: `Rs.${Number(plotRate).toLocaleString('en-IN')}/-`,
                      amount: `${Number(plotAmount).toLocaleString('en-IN')}/-`
                    });
                  }
                  if (includeBuilding) {
                    pricingRows.push({
                      desc: 'BUILDING (GROUND FLOOR)',
                      unit: 'SFT',
                      qty: builtupArea,
                      rate: `Rs. ${Number(buildingRate).toLocaleString('en-IN')}`,
                      amount: `${Number(buildingAmount).toLocaleString('en-IN')}/-`
                    });
                  }
                  if (includeBorewell) {
                    pricingRows.push({
                      desc: 'BOREWELL DIVINE & ELECTRICITY',
                      unit: 'L.S',
                      qty: 1,
                      rate: `Rs. ${Number(borewellCost).toLocaleString('en-IN')}`,
                      amount: `${Number(borewellCost).toLocaleString('en-IN')}/-`
                    });
                  }

                  return (
                    <>
                      {pricingRows.map((row, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{row.desc}</td>
                          <td className="text-center">{row.unit}</td>
                          <td className="text-center">{row.qty}</td>
                          <td className="text-center">{row.rate}</td>
                          <td className="text-center">{row.amount}</td>
                        </tr>
                      ))}
                    </>
                  );
                })()}
                <tr className="invoice-pricing-total-row">
                  <td colSpan="5" className="text-center font-bold">T O T A L</td>
                  <td className="text-center font-bold">Rs.{Number(totalAmount).toLocaleString('en-IN')}/-</td>
                </tr>
              </tbody>
            </table>

            {/* Advance banner */}
            <div className="invoice-advance-callout">
              ADVANCE RECEIVED AS ON {date} = {Number(advanceAmount).toLocaleString('en-IN')}/-
            </div>

            {/* Note & Thanks & Signature lines */}
            <div className="invoice-closing-section">
              <p className="invoice-caution-note">
                NOTE: "{noteText.toUpperCase()}"
              </p>
              
              <p className="invoice-thanks-text">THANKS...</p>

              <div className="invoice-signatures-row">
                <div className="sig-column">
                  <span className="sig-name">CLIENT SIGNATURE</span>
                </div>
                <div className="sig-column text-right">
                  <span className="sig-name">SQUAARETEN CONSTRUCTION</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Address Details */}
            <div className="invoice-bottom-border-line" />
            <div className="invoice-bottom-address">
              116/294 J, VIJAYASEKARAN STREET, KANMAIKARAI, ARAPALYAM, MADURAI – 625016.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
