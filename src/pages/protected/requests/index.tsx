import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { IContext, IFollowers } from "../../../types/utility";
import { userService } from "../../../services";
import { AxiosError } from "axios";
import { RequestCard } from "./components";

interface ApiErrorResponse {
    message?: string;
}

export const Requests = () => {
    const { refetch } = useOutletContext<IContext>();

    const [requests, setRequests] = useState<IFollowers[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await userService.getFollowRequests();
            setRequests(response.data.requests);
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (requestId: number) => {
        setError("");

        try {
            await userService.acceptFollowRequest(requestId);
            setRequests(prev => prev.filter(req => req.id !== requestId));
            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to accept request');
        }
    };

    const handleReject = async (requestId: number) => {
        if (!confirm('Are you sure you want to decline this request?')) return;

        setError("");

        try {
            await userService.rejectFollowRequest(requestId);
            setRequests(prev => prev.filter(req => req.id !== requestId));
            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to reject request');
        }
    };

    if (loading) {
        return (
            <div className="requests">
                <div className="requests__loading">
                    <div className="requests__spinner"></div>
                    <p>Loading requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="requests">
            <div className="requests__container">
                <div className="requests__header">
                    <h1 className="requests__title">Follow Requests</h1>
                    <p className="requests__description">
                        Manage who can follow you and see your content
                    </p>
                </div>

                {error && (
                    <div className="requests__error">
                        {error}
                    </div>
                )}

                <div className="requests__content">
                    {requests.length > 0 ? (
                        <div className="requests__list">
                            <div className="requests__count">
                                {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
                            </div>
                            {requests.map(request => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    onAccept={handleAccept}
                                    onReject={handleReject}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="requests__empty">
                            <div className="requests__empty-icon">✉️</div>
                            <h3>No Pending Requests</h3>
                            <p>When someone requests to follow you, they'll appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
