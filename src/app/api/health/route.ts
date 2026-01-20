import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, limit, getDocs, query } from 'firebase/firestore';

export async function GET() {
    const healthStatus = {
        status: 'online', // optimistic default
        timestamp: new Date().toISOString(),
        checks: {
            database: 'unknown',
            ghl_integration: 'unknown',
            vapi_integration: 'unknown'
        },
        warnings: [] as string[]
    };

    // 1. Check Database (Firebase)
    try {
        // Try to fetch 1 document to prove connection
        const q = query(collection(db, 'leads'), limit(1));
        await getDocs(q);
        healthStatus.checks.database = 'operational';
    } catch (error) {
        healthStatus.checks.database = 'unreachable';
        healthStatus.status = 'degraded';
        healthStatus.warnings.push('Database connectivity failed.');
    }

    // 2. Check GHL Config
    if (process.env.GHL_API_KEY) {
        healthStatus.checks.ghl_integration = 'configured';
    } else {
        healthStatus.checks.ghl_integration = 'missing_config';
        healthStatus.warnings.push('GHL_API_KEY is not set. Leads will not sync.');
    }

    // 3. Check Vapi Config
    if (process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
        healthStatus.checks.vapi_integration = 'configured';
    } else {
        healthStatus.checks.vapi_integration = 'missing_config';
        healthStatus.warnings.push('Vapi Keys are missing.');
    }

    const statusCode = healthStatus.status === 'online' ? 200 : 503;

    return NextResponse.json(healthStatus, { status: statusCode });
}
