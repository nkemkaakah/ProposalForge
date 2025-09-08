interface DemoDigestEmailProps {
  companyName: string;
}

export default function DemoDigestEmail({ companyName }: DemoDigestEmailProps) {
  const containerStyles = {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    lineHeight: '1.4',
    color: '#374151'
  };

  const customStyles = {
    h1: {
      color: '#1f2937',
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '1.25',
      margin: '0 0 16px 0'
    },
    p: {
      margin: '0 0 16px 0'
    },
    strong: {
      fontWeight: '600'
    }
  };

  return (
    <div style={containerStyles} data-testid="email-preview-content">
      <img 
        src="https://app.rulebase.co/img/rulebase-logo.png" 
        alt="Rulebase" 
        width="64" 
        height="64" 
        className="mb-4" 
      />
      
      <h1 style={customStyles.h1}>
        Account closure report for {companyName} - July 2025
      </h1>
      
      <p style={customStyles.p}>
        In July 2025, there were <strong style={customStyles.strong}>115</strong> account closure requests. The key reasons for requesting closure were:
      </p>
      
      <ol className="space-y-2 mb-4" style={{ margin: '0 0 16px 0', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Unspecified reasons</strong> (~35%) - Customers requesting closure without providing detailed explanations
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Banking consolidation</strong> (~25%) - Customers closing accounts because they have multiple banks and want to reduce the number of accounts they maintain
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Account restrictions/liens</strong> (~20%) - Customer frustration with account restrictions due to erroneous transfer disputes
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Account setup issues</strong> (~10%) - Problems completing account creation, BVN/NIN mismatches, or profile setup
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Service dissatisfaction</strong> (~7%) - General dissatisfaction with customer service and resolution processes
        </li>
        <li style={{ marginBottom: '8px' }}>
          <strong style={customStyles.strong}>Overdraft disputes</strong> (~3%) - Issues with overdraft interest calculations and repayment terms
        </li>
      </ol>
      
      <p style={customStyles.p}>
        Click "View full report" to see all customer interactions.
      </p>
      
      <div style={{ textAlign: 'center', marginTop: '-24px' }}>
        <a 
          href="https://app.rulebase.co/reports/demo"
          style={{
            background: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)',
            boxShadow: '0 4px 12px rgba(55, 65, 81, 0.4)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
            display: 'inline-block'
          }}
        >
          View full report
        </a>
      </div>
    </div>
  );
}
