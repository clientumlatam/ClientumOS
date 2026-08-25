/**
 * App Layout - Twenty CRM style minimalist layout.
 *
 * Left: Slim sidebar with navigation.
 * Main: Content area.
 */

import { ErrorBoundary } from '../ErrorBoundary';
import { ToastContainer } from '../common/ToastContainer';

const AppLayout = ( { children, sidebar, module } ) => {
	return (
		<div className="flex h-screen w-screen bg-gray-50 text-gray-900" data-module={ module || 'overview' }>
			<ToastContainer />
			
			{ /* Minimal Sidebar */ }
			<aside className="w-64 border-r border-gray-200 bg-white p-4 flex flex-col">
				<div className="font-bold text-lg mb-8">Clientum</div>
				<div className="flex-1">
					{ sidebar }
				</div>
			</aside>
			
			{ /* Main Content */ }
			<main className="flex-1 flex flex-col overflow-hidden">
				<div className="flex-1 overflow-auto p-8 animate__animated animate__fadeIn animate__faster">
					<ErrorBoundary>
						{ children }
					</ErrorBoundary>
				</div>
			</main>
		</div>
	);
};

export default AppLayout;
